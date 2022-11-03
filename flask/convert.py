from pydub import AudioSegment
from os import path
def mp3_to_wav(src,dst):                                                                                                                 
    sound = AudioSegment.from_mp3(src)
    sound.export(dst, format="wav")
