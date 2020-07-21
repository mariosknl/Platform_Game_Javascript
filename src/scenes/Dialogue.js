import Phaser from 'phaser';

export default class Dialogue extends Phaser.Scene {
  constructor(selfScene, title, content, nextScene) {
    super(selfScene);
    this.title = title;
    this.selfScene = selfScene;
    this.content = content;
    this.nextScene = nextScene;
    this.Alertthis.dialog = null;
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
    this.this.dialog = scene.rexUI.add.this.dialog({
      width: 300,
      background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

      title: scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f),
        text: scene.add.text(0, 0, '', {
          fontSize: '24px',
        }),
        space: {
          left: 15,
          right: 15,
          top: 10,
          bottom: 10,
        },
      }),

      content: scene.add.text(0, 0, '', {
        fontSize: '24px',
      }),

      actions: [
        scene.rexUI.add.label({
          background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),

          text: scene.add.text(0, 0, 'OK', {
            fontSize: '24px',
          }),

          space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
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
        actions: 'center', // 'center'|'left'|'right'
      },

      expand: {
        content: false, // Content is a pure text object
      },
    })
      .on('button.over', (button, groupName, index, pointer, event) => {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
      })
      .on('button.out', (button, groupName, index, pointer, event) => {
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
    this.this.dialog.getElement('title').text = title;
    this.this.dialog.getElement('content').text = content;
    return this.this.dialog;
  }

  Alert(scene, title, content, x, y) {
    if (x === undefined) {
      x = 400;
    }
    if (y === undefined) {
      y = 300;
    }
    if (!this.Alertthis.this.dialog) {
      this.Alertthis.this.dialog = this.CreateAlertthis.this.dialog(scene);
    }
    this.SetAlertthis.this.dialog(this.Alertthis.this.dialog, title, content);
    this.Alertthis.this.dialog
      .setPosition(x, y)
      .setVisible(true)
      .layout();

    return this.Alertthis.this.dialog
      .moveFromPromise(1000, undefined, '-=400', 'Bounce')
      .then(() => scene.rexUI.waitEvent(this.Alertthis.this.dialog, 'button.click'))
      .then(() => this.Alertthis.this.dialog.moveToPromise(1000, undefined, '-=400', 'Back'))
      .then(() => {
        this.Alertthis.this.dialog.setVisible(false);
        return Promise.resolve();
      });
  }
}