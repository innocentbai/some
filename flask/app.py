import os
#import pyOpenSSL
from flask import Flask, flash, request, redirect, url_for,send_from_directory
from convert import mp3_to_wav
from werkzeug.utils import secure_filename

from classic import classic_transform

UPLOAD_FOLDER = 'D:\\program\\Python\\flask\\upload'
ALLOWED_EXTENSIONS = {'mp3','wav'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.add_url_rule(
    "/downloads/<username>/mid/<filename>", endpoint="download_mid", build_only=True
)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def drop_suff(filename):
    return filename.rsplit('.',1)[0]

def all_to_mid(filename):
    newname=filename
    if(filename.rsplit('.',1)[1].lower()=='mp3'):
        newname=filename.rsplit('.',1)[0]+'.wav'
        mp3_to_wav(filename,newname)
    return newname

@app.route("/")
def hello():
    return "<p>hello</p>"

@app.route('/uploads/<username>/input/<string:mode>/<string:instr>',methods=['GET','POST'])
def upload_file(username,mode,instr):
    if request.method=='POST':
        file=request.files.get("file")
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filename = all_to_mid(filename)
            if(os.path.exists(os.path.join(app.config["UPLOAD_FOLDER"], username))==False):
                os.mkdir((os.path.join(app.config["UPLOAD_FOLDER"], username)))
            filepath=os.path.join(app.config['UPLOAD_FOLDER'],username,filename)
            file.save(filepath)
            if(mode=='classic'):
                classic_transform(drop_suff(filepath),instr)
                os.system('MuseScore3.exe -M midi_import_options.xml '+ drop_suff(filepath)+'.mid' + ' -o ' + drop_suff(filepath)+'.pdf')
                return redirect(url_for('download_pdf', username=username, filename=drop_suff(filename)+'.pdf'))
        else:
            return 'format error'
    return  '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

@app.route('/downloads/<username>/mid/<filename>')
def download_mid(username,filename):
    return send_from_directory(os.path.join(app.config["UPLOAD_FOLDER"], username), filename)

@app.route('/downloads/<username>/pdf/<filename>')
def download_pdf(username,filename):
    return send_from_directory(os.path.join(app.config["UPLOAD_FOLDER"], username), filename)

