# P-Lot-Smart-Parking-System-Mobile-App

Bu çalışmada, Raspberry Pi 3B+ geliştirme kartı, Firebase ortamı, React kütüphanesi ve
Python yazılım geliştirme dili kullanılarak akıllı otopark sistemi tasarlanmıştır. Tasarımda,
otopark sisteminin kontrolü için Raspberry Pi geliştirme kartı kullanılmıştır. Raspberry Pi ve
kullanıcı kontrolü için React kütüphanesi ile bir mobil uygulama geliştirilmiş, firebase ortamı
ile kullanıcı bilgileri kayıt altına alınmış ve senkronizasyon sağlanmıştır.
Otopark sisteminde araçların tespiti için IR Sensör kullanılarak analiz edilmiş, analiz
sonucunda sensörün durumuna göre bir sonuca varılmış ve çevre birimler aktif edilerek mobil
uygulamaya bilgi akışı sağlanarak kullanıcılar bilgilendirilmiştir. Sistem Firebase ortamı ile
senkronize bir şekilde çalışmaktadır. Aynı zamanda sistemi kullanan kullanıcıların anlık 
araç görüntüsü ve kullanıcı bilgileri bir “txt” dosyasına kayıt edilebilmektedir.

*Mobil Uygulama Sayfaları 1;*
#
![mobil_afisv1_2](https://user-images.githubusercontent.com/70108497/179235543-77543d83-ae67-429a-9b4e-8b009732989c.jpg)

*Mobil Uygulama Sayfaları 2;*
#
![mobil_afisv1_3](https://user-images.githubusercontent.com/70108497/179235731-94da842b-0245-4076-91f3-60323498e6f6.jpg)
#
*Otopark Sisteminin Maketi;*

![image](https://user-images.githubusercontent.com/70108497/179244930-f416f595-7933-4f76-9754-b13aca614594.png)

![image](https://user-images.githubusercontent.com/70108497/179245028-b60e92a5-b782-4696-a048-1b7543ef7aef.png)

# Python Kısmı
Bu kısımda Raspberry Pi 3 B+ kartı kullanılarak IR Sensörlerden anlık bilgi alınmıştır. Alınan bilgiler firebase ortamının 
realtime database özelliği ile firebase ortamına anlık olarak iletilmiştir. Bu kısımda 4 adet IR Sensör kullanıldığı için Thread özelliği
kullanılarak 4 sensör aynı anda çalıştırılmıştır.

*Kütüphane Tanımlamalarının Yapıldığı Program Bölümü;*
```python
import threading
from time import sleep
import datetime
import RPi.GPIO as GPIO
import pyrebase
import cv2
```
*Firebase Config Tanımlamalarının Yapıldığı Program Bölümü;*
```python
firebaseConfig = {
  "apiKey": "************************************",
  "authDomain": "************************************",
  "databaseURL": "************************************",
  "projectId": "************************************",
  "storageBucket": "************************************",
  "messagingSenderId": "************************************",
  "appId": "************************************",
  "measurementId": "************************************"
}
```
*GPIO Pin Tanımlamalarının Yapıldığı Program Bölümü;*
```python
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

GPIO.setup(40, GPIO.OUT)
GPIO.setup(11, GPIO.IN)
GPIO.setup(13, GPIO.IN)
GPIO.setup(15, GPIO.IN)
GPIO.setup(16, GPIO.IN)

pwm3 = GPIO.PWM(40,50)
pwm3.start(0)

cap = cv2.VideoCapture(0)
```
*IR Sensör Fonksiyonları Tanımlamalarının Yapıldığı Program Bölümü;*
```python
def sensorA1():
    while 1:
        sensor = GPIO.input(11)
        print("A1 : ",sensor)
        sleep(3)
        if(sensor==1):
          hopper_ref = db.child("users2")
          hopper_ref.update({
                  'a1': 1
              })
        else:
            hopper_ref = db.child("users2")
            hopper_ref.update({
                  'a1': 0
              })

def sensorB1():
    while 1:
        sensor2 = GPIO.input(13)
        print("B1 : ",sensor2)
        sleep(3)
        if(sensor2==1):
          hopper_ref = db.child("users2")
          hopper_ref.update({
                  'b1': 1
              })
        else:
            hopper_ref = db.child("users2")
            hopper_ref.update({
                  'b1': 0
              })

def sensorC1():
    while 1:
        sensor3 = GPIO.input(15)
        print("C1 : ",sensor3)
        sleep(3)
        if(sensor3==1):
          hopper_ref = db.child("users2")
          hopper_ref.update({
                  'c1': 1
              })
        else:
            hopper_ref = db.child("users2")
            hopper_ref.update({
                  'c1': 0
              })

```
*Giriş Şartının Sağlanması Durumunda Çalışan Program Bölümü;*
```python
def otoparkKapi():
    while 1:
        
        global i
        global list
        
        an = datetime.datetime.now()
        print("--/**************************************************\--")
        users = db.child("users2").child("Position").shallow().get()
        users2 = db.child("users2").child("kullanici").shallow().get()
        users3 = db.child("users2").child("plaka").shallow().get()
        print("KAPI DURUMU : ",users.val())
        print("KULLANICI : ",users2.val())
        print("ARAÇ PLAKASI : ",users3.val())
        print("GİRİŞ SAATİ : ",an)
        print("--/**************************************************\--")
        
        yeni = str(users.val())
        print((list))
        sleep(3)
        
        if(yeni == "open"):
            print("KAPI AÇILDI")

            #Servo Çalışcak


            users2 = db.child("users2").child("kullanici").shallow().get()
            users3 = db.child("users2").child("plaka").shallow().get()
            list[i].append(users2.val())
            list[i].append(users3.val())
            sleep(10)

            an = datetime.datetime.now()
            an = str(an)

            dosya_2 = open("giris_yapan_araclar.txt", "a", encoding="utf-8")

            dosya_2.write("Kullanıcı\n")
            dosya_2.write(str(list[i][0]))
            dosya_2.write("\n")
            dosya_2.write("\n")
            dosya_2.write("Plaka\n")
            dosya_2.write(str(list[i][1]))
            dosya_2.write("\n")
            dosya_2.write("\n")
            dosya_2.write("Giriş Saati\n")
            dosya_2.write((an))
            dosya_2.write("\n")
            dosya_2.write("\n")
            dosya_2.write("--------------------------------")
            dosya_2.write("\n")
            dosya_2.write("++++++++++++++++++++++++++++++++++++++++++++++")
            dosya_2.write("\n")

            dosya_2.close()
            
            _,frame= cap.read()   
    
            key= cv2.waitKey(0)
            cv2.putText(frame, "Kullanici : {}".format(users2.val()),(30,30),cv2.FONT_HERSHEY_PLAIN,1,(100,200,0),1)
            cv2.putText(frame, "Arac : {}".format(users3.val()),(30,50),cv2.FONT_HERSHEY_PLAIN,1,(100,200,0),1)
            cv2.putText(frame, "Giris Saati : {}".format(an),(30,70),cv2.FONT_HERSHEY_PLAIN,1,(100,200,0),1)
            cv2.imwrite("/home/pi/Raspberryi-Pi-3-Sekil-Algilama-Sistemi/p3.png",frame)
                    
                    
            cap.release()

            hopper_ref = db.child("users2")
            hopper_ref.update({
              'Position': 'close'
            })
            i = i + 1
            
            pwm3.ChangeDutyCycle(5)
            sleep(1)
            pwm3.ChangeDutyCycle(0)
            sleep(6)
            pwm3.ChangeDutyCycle(2)
            sleep(1)
            pwm3.ChangeDutyCycle(0)        

            #Servo Kapanıcak
            print("KAPI KAPANDI")
```
*Programın Ana Kısmı;*
```python
t1 = threading.Thread(target=sensorA1)
t2 = threading.Thread(target=sensorB1)
t3 = threading.Thread(target=sensorC1)
t4 = threading.Thread(target=otoparkKapi)

t1.start()
t2.start()
t3.start()
t4.start()
```

# Firebase Ortamının Tasarlanması
Firebase tasarımı kullanıcı bilgilerini tutmak, sistemin senkronize çalışmasını sağlamak için
kullanılmıştır. İlk olarak bir Android projesi oluşturulmuştur. Android proje oluşturularak
mobil uygulama üzerinden kayıt olan kullanıcı bilgileri sisteme giriş kontrolleri ve kullanıcı
işlemleri için kayıt altına alınmıştır.

*Firebase Ortamının Authentication Sayfası;*
![image](https://user-images.githubusercontent.com/70108497/181048582-4791da5b-015c-42a7-8bb0-2406910d6dcd.png)

Sisteme kayıt olan her kullanıcı için Firebase tarafından bir kullanıcı ID’si atanmaktadır. Bu
ID sayesinde kullanıcı ile Raspberry Pi kontrolleri sağlanmaktadır. Aynı zamanda
kullanıcıların verileri aşağıdaki Şekil’de görüldüğü gibi Firebase’in Cloud Firestore özelliği kullanılarak
tutulmaktadır.

*Firebase Ortamının Cloud Firestore Sayfası;*
![image](https://user-images.githubusercontent.com/70108497/181048925-0ba5f8c8-dcd0-40e4-a62a-bd332801ac90.png)

Firebase’in “Realtime Database” özelliği kullanılarak “users2” adında bir key
oluşturulmuştur. Bu key altında “Position”, “a1”, “b1”, “c1”, “d1”, “kullanıci”, “plaka”
değişkenleri oluşturularak Raspberry Pi tarafından anlık olarak IR Sensörden gelen bilgiler ve
mobil uygulamadan gelen bilgiler Şekil’de görüldüğü gibi elde edilmiştir. Bu netice
sonucunda elde edilen bilgiler kullanılarak tasarlanan sistemde ilgili alanlarda işlenmiştir.

*Firebase Realtime Database;*
![image](https://user-images.githubusercontent.com/70108497/181049571-ab967785-e6cc-438b-af47-85ea238b276a.png)

# Gerçek Zamanlı Test
İlk olarak sistemin doğru bir şekilde çalışabilmesi için raspberry pi tarafındaki tasarlanan
python kodu çalıştırılmıştır. Bu kısımda raspberry pi sürekli olarak firebase sunucusunu
dinlemektedir. Bu sunucudan gelen bilgilere göre tasarlanan platform üzerindeki servo –
motoru çalıştırmaktadır. Aynı zamanda raspberry pi tarafından firebase ortamına anlık olarak 
IR Sensörlerden gelen bilgiler gönderilmektedir. Bu aşamada 4 adet IR Sensör kullanıldığı için 
sensörlerin bir birlerini bloklamaması için bu sensörleri çalıştıran fonksiyonlar paralel olarak 
yani hepsi aynı anda çalıştırılmıştır.

*Sistemin Gerçek Zamanlı Raspberry Pi Tarafının Çalıştırılması;*
![image](https://user-images.githubusercontent.com/70108497/181044814-c764b0e0-43b5-4603-8b13-f1828a4803f6.png)

Yukarıdaki fotoğrafta alınan çıktı ilk versiyonların çıktısıdır. Son halinde IR Sensör bilgileri, giriş yapan kullanıcı araç plakası,
giriş yapan kullanıcının ad - soyad bilgisi ve giriş yaptığı anın zaman bilgisi python tarafına yani raspberry pi tarafına firebase 
ortamından gönderilmektedir. Giriş yapan her kullanıcının bilgileri bir listede tutulmaktadır. Bu listeye eklendikten sonra txt dosyasına 
gerekli bilgiler kayıt edilmektedir.

*Bilgilerin Txt Dosyasına Kayıt Edilmesi;*
![image](https://user-images.githubusercontent.com/70108497/181047254-826a71b0-10c3-415d-9549-f82eae21939b.png)









