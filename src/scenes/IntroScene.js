import Phaser from 'phaser';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  create() {
    this.cameras.main.setBackgroundColor('#9631AB');
    this.introText = this.add.text(200, 0, 'Introduction', { fontSize: '34px', fill: '#fff' });
    this.createdByText = this.add.text(200, 0, 'In year 2038, science made one more mistake. \n After trying to create a medicine to heal humanity\'s worst enemy, called Virus-8493, \n one explosion was enough to spread the germ and infect thousands of people. Nowadays, infected people are walking around \n like living-dead creatures, ready to conquer the world \n and extinct human race. They have managed to declare a some kind of chief among them who cannot \n fill his hunger of human flesh. His name is Slaughter King and he will try his best so there wont be any HUMAN left on planet Earth....', { fontSize: '20px', fill: '#fff', align: 'center' });
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
      duration: 3000,
      delay: 1000,
    });

    this.createdByTween = this.tweens.add({
      targets: this.createdByText,
      y: -500,
      duration: 6000,
      delay: 1000,
      onComplete: (() => {
        this.scene.start('Title');
      }),
    });
  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('Title');
    }
  }
}