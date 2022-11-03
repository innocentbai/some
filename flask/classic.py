from cqt_transform import cqt_trans
from midiutil import MIDIFile 
import argparse

ins_dict={
    'acoustic piano':0,
    'electric piano':2,
    'acoustic guitar':24,
    'electric guitar':26,
    'flute':73,
    'saxophone':66,
    'violin':40
}

def classic_transform(input,instru,time=None):
    midi_info,tempo=cqt_trans(input+'.wav',time)
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

'''
if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('-inp',type=str)
    parser.add_argument('-ins',type=str,choices=['acoustic piano','electric piano','acoustic guitar','electric guitar','flute','saxophone','violin'])
    parser.add_argument('-t',type=int,default=None)
    args=parser.parse_args()
    classic_transform(args.inp,args.ins,args.t)
'''