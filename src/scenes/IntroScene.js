import Phaser from 'phaser';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  create() {
    this.add.image(400, 300, 'introBg');
    this.introText = this.add.text(200, 0, 'Introduction', { fontSize: '34px', fill: '#fff' });
    this.createdByText = this.add.text(200, 0, 'In year 2038,\nscience made one more mistake. \n After trying to create a medicine to heal humanity\'s worst enemy,\ncalled Virus-8493, \n one explosion was enough to\nspread the germ and infect thousands of people.\nNowadays, infected people are walking around \n like living-dead creatures, ready to conquer the world \n and extinct human race.\nThey have managed to declare a some kind of\ncaptain among them who cannot \n fill his hunger of human flesh.\nHis name is Slaughter King\nand he will try his best\nso there wont be any HUMAN left on planet Earth....', { fontSize: '20px', fill: '#fff', align: 'center' });
    this.zone = this.add.zone(400, 300, 800, 600);

    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipText = this.add.text(10, 10, 'Press Space to skip', { fontSize: '12px', fill: '#fff' });

    Phaser.Display.Align.In.Center(
      this.introText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.createdByText,
      this.zone,
    );
    this.createdByText.setY(650);

    this.introTween = this.tweens.add({
      targets: this.introText,
      y: -200,
      duration: 5000,
      delay: 2000,
    });

    this.createdByTween = this.tweens.add({
      targets: this.createdByText,
      y: -400,
      duration: 25000,
      delay: 2000,
      onComplete: (() => {
        this.scene.start('Title');
      }),
    });

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('Title');
    }
  }
}