import os
import shutil
from flask import Flask, request, redirect, url_for,send_from_directory
from convert import mp3_to_wav,flac_to_wav
from werkzeug.utils import secure_filename

from classic import classic_transform_v1
from classic import classic_transform_v2

#UPLOAD_FOLDER = 'D:\\program\\Python\\flask\\upload'
UPLOAD_FOLDER = '/www/wwwroot/flask/uploads'
#BASE_FOLDER = 'D:\\program\\Python\\flask\\'
BASE_FOLDER = '/www/wwwroot/flask'
#SAMPLE_FOLDER='D:\\program\\Python\\flask\\samples'
SAMPLE_FOLDER = '/www/wwwroot/flask/samples'
WEB_FOLDER='/www/wwwroot/flask/moban1468'
CSS_FOLDER='/www/wwwroot/flask/moban1468/css'
JS_FOLDER='/www/wwwroot/flask/moban1468/js'
IMG_FOLDER='/www/wwwroot/flask/moban1468/img'

ALLOWED_EXTENSIONS = {'mp3','wav','flac'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

sample_to_file={
    'acoustic_piano':'piano.mp3',
    'acoustic_guitar':'acoustic guitar.mp3',
    'saxophone':'saxophone.mp3',
    'harmonica':'harmonica.mp3',
    'flute':'flute.mp3',
    'violin':'violin.mp3',
    'electric guitar':'electric guitar.wav',
    'cello':'cello.mp3',
    'trumpet':'trumpet.mp3',
    'acoustic bass':'acoustic bass.mp3'
}

def ip_to_num(ip):
    res=0
    ip=list(map(int,ip.split('.')))
    for num in ip:
        res=res<<8
        res=res^num
    return num

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def drop_suff(filename):
    return filename.rsplit('.',1)[0]

def all_to_wav(filename):
    newname=filename
    if(filename.rsplit('.',1)[1].lower()=='mp3'):
        newname=filename.rsplit('.',1)[0]+'.wav'
        mp3_to_wav(filename,newname)
    if(filename.rsplit('.',1)[1].lower()=='flac'):
        newname=filename.rsplit('.',1)[0]+'.wav'
        flac_to_wav(filename,newname)
    return newname

@app.route("/",methods=['GET','POST'])
def index():
    if request.method=='POST':
        form_data=request.form
        mo=form_data.get('mode')
        instrument=form_data.get('instrument')
        return redirect(url_for('web_upload_file', instr=instrument,mode=mo))
    if request.method=='GET':
        return send_from_directory(WEB_FOLDER,'index.html')

@app.route("/css/<source>",methods=['GET'])
def send_css(source):
    print(os.path.join(WEB_FOLDER,'/css'))
    return send_from_directory(CSS_FOLDER,source)

@app.route("/js/<source>",methods=['GET'])
def send_js(source):
    return send_from_directory(JS_FOLDER,source)

@app.route("/img/<source>",methods=['GET'])
def send_img(source):
    return send_from_directory(IMG_FOLDER,source)

@app.route('/uploads/<username>/<string:mode>/<string:instr>',methods=['GET','POST'])
def upload_file(username,mode,instr):
    if request.method=='POST':
        file=request.files.get("file")
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)            
            if(os.path.exists(os.path.join(app.config["UPLOAD_FOLDER"], username))==False):
                os.mkdir((os.path.join(app.config["UPLOAD_FOLDER"], username)))
            filepath=os.path.join(app.config['UPLOAD_FOLDER'],username,filename)
            file.save(filepath)
            filepath = all_to_wav(filepath)
            if(mode=='classic'):
                classic_transform_v2(drop_suff(filepath),instr)
                os.system('mscore -M midi_import_options.xml '+ drop_suff(filepath)+'.mid' + ' -o ' + drop_suff(filepath)+'.pdf')
                os.system('mscore -M midi_import_options.xml '+ drop_suff(filepath)+'.mid' + ' -o ' + drop_suff(filepath)+'_new.mp3')
                return drop_suff(filename)
        else:
            return 'format error'
    return  drop_suff(filename)

@app.route('/web/uploads/<string:mode>/<string:instr>',methods=['GET','POST'])
def web_upload_file(mode,instr):
    username='webuser'+str(ip_to_num(request.remote_addr))
    if request.method=='POST':
        file=request.files.get("file")
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)            
            if(os.path.exists(os.path.join(app.config["UPLOAD_FOLDER"], username))==False):
                os.mkdir((os.path.join(app.config["UPLOAD_FOLDER"], username)))
            filepath=os.path.join(app.config['UPLOAD_FOLDER'],username,filename)
            file.save(filepath)
            filepath = all_to_wav(filepath)
            if(mode=='classic'):
                classic_transform_v2(drop_suff(filepath),instr)
                os.system('mscore -M midi_import_options.xml '+ drop_suff(filepath)+'.mid' + ' -o ' + drop_suff(filepath)+'.pdf')
                os.system('mscore -M midi_import_options.xml '+ drop_suff(filepath)+'.mid' + ' -o ' + drop_suff(filepath)+'_new.mp3')
                return redirect(url_for('choice', username=username, filename=drop_suff(filename)))
        else:
            return 'format error'
    return  send_from_directory(WEB_FOLDER,'upload.html')

@app.route('/downloads/<username>/mid/<filename>')
def download_mid(username,filename):
    return send_from_directory(os.path.join(app.config["UPLOAD_FOLDER"], username), filename+'_new.mp3')

@app.route('/downloads/<username>/pdf/<filename>')
def download_pdf(username,filename):
    return send_from_directory(os.path.join(app.config["UPLOAD_FOLDER"], username), filename+'.pdf')

@app.route('/delete/<username>')
def delete_user(username):
    shutil.rmtree(os.path.join(app.config["UPLOAD_FOLDER"], username))
    return 'successfully delete'

@app.route('/choice/<username>/<filename>',methods=['GET','POST'])
def choice(username,filename):
    if(request.method=='GET'):
        return  send_from_directory(WEB_FOLDER,'choice.html')
    if(request.method=='POST'):
        form_data=request.form
        req=form_data.get('req')
        if(req=='试听'):
            return redirect(url_for('download_mid',username=username,filename=filename))
        if(req=='下载'):
            return redirect(url_for('download_pdf',username=username,filename=filename))

@app.route('/samples/<string:instr>',methods=['GET'])
def samples(instr):
    return send_from_directory(SAMPLE_FOLDER,sample_to_file[instr])

if __name__=='__main__': 
    app.run('0.0.0.0', debug=True, port=443, ssl_context=('8737663_musictrans.top.pem', '8737663_musictrans.top.key')) 