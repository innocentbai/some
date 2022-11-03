#Imports

## General Imports
import numpy as np

## Visualization
#import seaborn
#import matplotlib.pyplot as plt
#import IPython.display as ipd
#from ipywidgets import interactive_output #http://ipywidgets.readthedocs.io/en/latest/index.html
#from ipywidgets import IntSlider, FloatSlider, fixed, Checkbox
#from ipywidgets import VBox, Label


## Audio Imports
import librosa, librosa.display           #https://librosa.github.io/librosa/index.html
from music21.tempo import MetronomeMark   #http://web.mit.edu/music21/
from music21.note import Note, Rest


# Parameters
## Signal Processing 
fs = 44100                               # Sampling Frequency
nfft = 2048                              # length of the FFT window
overlap = 0.5                            # Hop overlap percentage
hop_length = int(nfft*(1-overlap))       # Number of samples between successive frames
n_bins = 72                             # Number of frequency bins
mag_exp = 2                              # Magnitude Exponent
pre_post_max = 4                         # Pre- and post- samples for peak picking
cqt_threshold = -75                      # Threshold for CQT dB levels, all values below threshold are set to -120 dB

#CQT function
def calc_cqt(x,fs=fs,hop_length=hop_length, n_bins=n_bins, mag_exp=mag_exp):
    C = librosa.cqt(x, sr=fs, hop_length=hop_length, fmin=None, n_bins=n_bins)
    C_mag = librosa.magphase(C)[0]**mag_exp
    CdB = librosa.core.amplitude_to_db(C_mag ,ref=np.max)
    return CdB

# CQT Threshold
def cqt_thresholded(cqt,thres=cqt_threshold):
    new_cqt=np.copy(cqt)
    new_cqt[new_cqt<thres]=-120
    return new_cqt

# Onset Envelope from Cqt
def calc_onset_env(cqt):
    return librosa.onset.onset_strength(S=cqt, sr=fs, aggregate=np.mean, hop_length=hop_length)

# Onset from Onset Envelope
def calc_onset(cqt, pre_post_max=pre_post_max, backtrack=True):
    onset_env=calc_onset_env(cqt)
    onset_frames = librosa.onset.onset_detect(onset_envelope=onset_env,
                                           sr=fs, units='frames', 
                                           hop_length=hop_length, 
                                           backtrack=backtrack,
                                           pre_max=pre_post_max,
                                           post_max=pre_post_max)
    onset_boundaries = np.concatenate([[0], onset_frames, [cqt.shape[1]]])
    onset_times = librosa.frames_to_time(onset_boundaries, sr=fs, hop_length=hop_length)
    return [onset_times, onset_boundaries, onset_env]

# Convert Seconds to Quarter-Notes
def time_to_beat(duration, tempo):
    return (tempo*duration/60)

# Remap input to 0-1 for Sine Amplitude or to 0-127 for MIDI
def remap(x, in_min, in_max, out_min, out_max):
    #return np.log(x-in_min)*out_max/np.log(in_max-in_min)+out_min
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

# Generate Sinewave, MIDI Notes and music21 notes
def generate_sine_midi_note(f0_info, sr, n_duration, round_to_sixtenth=True):
    f0=f0_info[0]
    duration = librosa.frames_to_time(n_duration, sr=fs, hop_length=hop_length)
    #Generate Midi Note and music21 note
    midi_duration = time_to_beat(duration, tempo)
    midi_velocity=int(round(remap(f0_info[1], CdB.min(), CdB.max(), 0, 127)))
    if round_to_sixtenth:
        midi_duration=round(midi_duration*16)/16
    if f0==None:
        midi_note=None
        f0=0
    else:
        midi_note=round(librosa.hz_to_midi(f0))
    midi_info = [midi_note, midi_duration, midi_velocity]
    return midi_info

#Estimate Pitch
def estimate_pitch(segment, threshold):
    freqs = librosa.cqt_frequencies(n_bins=n_bins, fmin=librosa.note_to_hz('C1'),
                            bins_per_octave=12)
    if segment.max()<threshold:
        return [None, np.mean((np.amax(segment,axis=0)))]
    else:
        f0 = int(np.mean((np.argmax(segment,axis=0))))
    return [freqs[f0], np.mean((np.amax(segment,axis=0)))]

# Generate notes from Pitch estimation
def estimate_pitch_and_notes(x, onset_boundaries, i, sr):
    n0 = onset_boundaries[i]
    n1 = onset_boundaries[i+1]
    f0_info = estimate_pitch(np.mean(x[:,n0:n1],axis=1),threshold=cqt_threshold)
    return generate_sine_midi_note(f0_info, sr, n1-n0)

def cqt_trans(filename,duration):
    #load music from wav file
    x, fs = librosa.load(filename, sr=None, mono=True,duration=duration)
    global CdB
    CdB = calc_cqt(x,fs,hop_length, n_bins, mag_exp)
    new_cqt=cqt_thresholded(CdB,cqt_threshold)
    global onsets
    onsets=calc_onset(new_cqt,pre_post_max, False)
    # Estimate Tempo
    global tempo
    tempo, beats=librosa.beat.beat_track(y=None, sr=fs, onset_envelope=onsets[2], hop_length=hop_length,
               start_bpm=120.0, tightness=100, trim=True, bpm=None,
               units='frames')
    tempo=int(2*round(tempo/2))
    global mm
    mm = MetronomeMark(referent='quarter', number=tempo)
    # Array of music information - Sinewave, MIDI Notes and muisc21 Notes
    notes=[]
    for i in range(len(onsets[1])-1):
        notes.append(estimate_pitch_and_notes(CdB, onsets[1], i, sr=fs))
    music_info=np.array(notes,dtype=object)
    #music_info = np.array([estimate_pitch_and_notes(CdB, onsets[1], i, sr=fs) for i in range(len(onsets[1])-1)]);
    return music_info,tempo