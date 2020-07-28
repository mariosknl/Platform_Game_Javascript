import Phaser from 'phaser';

export default class Dialogue extends Phaser.Scene {
  constructor(selfScene, title, content, nextScene) {
    super(selfScene);
    this.selfScene = selfScene;
    this.title = title;
    this.content = content;
    this.nextScene = nextScene;
    this.AlertDialog = null;
  }

  preload() {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI',
    });
  }

  create() {
    const selfScene = this;
    this.Alert(selfScene, this.title, this.content)
      .then(() => this.scene.start(this.nextScene));
  }


  CreateAlertDialog(scene) {
    this.dialog = scene.rexUI.add.dialog({
      width: 300,
      background: scene.rexUI.add.roundRectangle(50, 50, 100, 100, 20, 0x264653),

      title: scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x2a9d8f),
        text: scene.add.text(200, 200, '', {
          fontSize: '22px',
        }),
        align: 'center',
      }),

      content: scene.add.text(0, 0, '', {
        fontSize: '20px',
        align: 'center',
      }),

      actions: [
        scene.rexUI.add.label({
          background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xf4a261),

          text: scene.add.text(0, 0, 'OK', {
            fontSize: '24px',
          }),

          space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          },

          align: {
            actions: 'center',
          },
        }),
      ],

      space: {
        title: 25,
        content: 25,
        action: 15,

        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },

      align: {
        actions: 'center',
      },

      expand: {
        content: false,
      },
    })
      .on('button.over', (button) => {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
      })
      .on('button.out', (button) => {
        button.getElement('background').setStrokeStyle();
      });

    return this.dialog;
  }

  SetAlertDialog(dialog, title, content) {
    if (title === undefined) {
      title = '';
    }
    if (content === undefined) {
      content = '';
    }
    this.dialog.getElement('title').text = title;
    this.dialog.getElement('content').text = content;
    return this.dialog;
  }

  Alert(scene, title, content, x, y) {
    if (x === undefined) {
      x = 400;
    }
    if (y === undefined) {
      y = 300;
    }
    if (!this.Alert.dialog) {
      this.AlertDialog = this.CreateAlertDialog(scene);
    }
    this.SetAlertDialog(this.AlertDialog, title, content);
    this.AlertDialog
      .setPosition(x, y)
      .setVisible(true)
      .layout();

    return this.AlertDialog
      .moveFromPromise(1000, undefined, '-=400', 'Bounce')
      .then(() => scene.rexUI.waitEvent(this.AlertDialog, 'button.click'))
      .then(() => this.AlertDialog.moveToPromise(1000, undefined, '-=400', 'Back'))
      .then(() => {
        this.AlertDialog.setVisible(false);
        return Promise.resolve();
      });
  }
}