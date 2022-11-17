from cqt_transform import cqt_trans_v1
from cqt_transform import cqt_trans_v2
from midiutil import MIDIFile 
from midi2audio import FluidSynth
import argparse

from music21.stream import Stream
from music21 import metadata
from music21 import instrument
from music21 import midi 
from music21.key import Key


ins_dict={
    'acoustic_piano':0,
    'electric_piano':2,
    'acoustic_guitar':24,
    'electric_guitar':26,
    'flute':73,
    'saxophone':66,
    'violin':40,
    'cello':42,
    'harmonica':22,
    'trumpet':56,
    'acoustic_bass':32
}

ms21ins={
    'acoustic_piano':'acoustic piano',
    'electric_piano':'electric piano',
    'acoustic_guitar':'acoustic guitar',
    'electric_guitar':'electric guitar',
    'flute':'flute',
    'saxophone':'saxophone',
    'violin':'violin',
    'cello':'cello',
    'harmonica':'harmonica',
    'trumpet':'trumpet',
    'acoustic_bass':'acoustic bass'
}

def classic_transform_v1(input,instru,time=None):
    midi_info,tempo=cqt_trans_v1(input+'.wav',time)
    track    = 0
    channel  = 0
    tempo    = tempo  # In BPM
    volume   = 100  # 0-127, as per the MIDI standard

    gnr = MIDIFile(1)  # One track, defaults to format 1 (tempo track is created
                      # automatically)
    gnr.addTrackName(0,0,str(input))
    program = ins_dict[str(instru)]
    gnr.addProgramChange(track, channel, 0, program)
    gnr.addTempo(track, 0, tempo)

    note_time=0
    for i, note in enumerate(midi_info):
        if note[0]==None:
            note_time+=note[1]
        else:
            note_time+=note[1]
            gnr.addNote(track, channel, note[0], note_time, note[1], note[2])

    with open(str(input)+".mid", "wb") as output_file:
        gnr.writeFile(output_file)    

    #FluidSynth('default.sf2').midi_to_audio(str(input)+".mid", str(input)+"_new"+".wav")

def classic_transform_v2(input,instru,time=None):
    note_info,mm=cqt_trans_v2(input+'.wav',time)
    s = Stream()
    s.append(mm)
    s.insert(0, metadata.Metadata())
    s.metadata.title = str(input)
    ins=instrument.fromString(ms21ins[instru])
    #ins.midiChannel=0
    s.append(ins)
    for note in note_info:
        s.append(note)
    key=s.analyze('key')
    # Insert Key to Stream
    s.insert(0, key)
    s.write('midi', str(input)+'.mid')

   # FluidSynth('default.sf2').midi_to_audio(str(input)+".mid", str(input)+"_new"+".wav")

'''
if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('-inp',type=str)
    parser.add_argument('-ins',type=str,choices=['acoustic piano','electric piano','acoustic guitar','electric guitar','flute','saxophone','violin'])
    parser.add_argument('-t',type=int,default=None)
    args=parser.parse_args()
    classic_transform(args.inp,args.ins,args.t)
'''