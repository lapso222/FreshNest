import 'package:flutter/material.dart';

import 'main.dart';

class Splash extends StatefulWidget {
  const Splash({ Key? key }) : super(key: key);

  @override
  State<Splash> createState() => _SplashState();
}

class _SplashState extends State<Splash> {
  @override
  void initState() {
    super.initState();
    _naviagteToHome();
  }


  _naviagteToHome()async{
    await Future.delayed(Duration(milliseconds: 1500), () {});
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context)=>App().getHomePage()));
  }

  @override
 Widget build(BuildContext context) {
    return Scaffold(
    body: Stack(
      children: [
        Center(
          child: Transform.scale(
            scale: 0.6,
            child: Container(
              decoration: const BoxDecoration(
                image: DecorationImage(image: AssetImage("assets/logo.png")),
              ),
            ),
          ),
        ),
        Align(
          alignment: Alignment.bottomCenter,
          child: Padding(
            padding: const EdgeInsets.only(bottom: 50.0),
            child: Text(
              "Your cozy corner \nfor farm fresh \n delights!",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 17.0,
                color: Color.fromARGB(255,0,180,71),
              ),
            ),
          ),
        ),
      ],
    ),
  );
  }
}