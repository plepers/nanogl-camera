import Camera from '../index'
import Node from 'nanogl-node'
import equalish from './equalish'


import expect from 'expect.js'
import { mat4 } from 'gl-matrix';
// import sinon  from 'sinon'



describe( "Camera", function(){


  describe( "module", function(){

    it( "should be exported", function(){
      expect( Camera ).to.be.ok();
    });

  });


  describe( "makePerspectiveCamera", function(){

    it( "should not throw", function(){
      expect( Camera.makePerspectiveCamera ).to.not.throwException();
    });

    it( "should return camera with pers lens", function(){
      var cam = Camera.makePerspectiveCamera();
      expect( cam.lens ).to.be.ok()
    });

  });



  describe( "final matrices", function(){
    var root, parent, n1, n2, cam;

    var tmat = [
        0, 0, 1, 0,
        0, 1, 0, 0,
       -1, 0, 0, 0,
        0, 0, 10, 1
    ]
    /*
      root
        | parent
           | cam
           | n1
              | n2
    */
    beforeEach(function(){
      root   = new Node();
      parent = new Node();
      n1     = new Node();
      n2     = new Node();

      root.  add( parent );
      parent.add( n1 );
      n1.    add( n2 );

      cam = Camera.makePerspectiveCamera()
      parent.add( cam );

      parent.rotateY( -Math.PI/2 )
      cam.rotateY( Math.PI/2 )

      n2.x = 8

      root.updateWorldMatrix()
    })


    describe( "modelViewMatrix", function(){

      it( 'should be correct', function(){
        var m = mat4.create();
        cam.modelViewMatrix( m, n2._wmatrix );

        equalish( m, [
            0, 0, 1, 0,
            0, 1, 0, 0,
           -1, 0, 0, 0,
            0, 0, 8, 1
        ]);

      });

      it( 'should be correct after node update', function(){
        var m = mat4.create();
        n2.x = 10;
        n2.updateWorldMatrix()
        cam.modelViewMatrix( m, n2._wmatrix );

        equalish( m, tmat );

      });

      it( 'should be correct after cam update', function(){
        var m = mat4.create();
        cam.z = 2;
        cam.updateWorldMatrix()
        cam.modelViewMatrix( m, n2._wmatrix );

        equalish( m, tmat );

      });

      it( 'should be correct after world update', function(){
        var m = mat4.create();
        cam.z = 1;
        n2.x = 9;
        root.updateWorldMatrix()
        cam.modelViewMatrix( m, n2._wmatrix );

        equalish( m, tmat );

      });

    });



  });





});
