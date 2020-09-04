/** Class representing a Weapon */
class Weapon {
  /**
   * Create a weapon
   * @param {String} name - The name of the weapon 
   * @param {Number} damage - The damade of the weapon
   * @param {String} img - The image of the weapon
   */
  constructor(name, damage, img) {
    this.name = name;
    this.damage = damage;
    this.img = img;
    this.onBoard = false;
  }
}
export default Weapon;
