/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

const Env = use('Env');

class User extends Model {

  static get computed() {
    return ['avatar_url']
  }

  static boot() {
    super.boot();

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  workshops() {
    return this.hasMany('App/Models/Workshop');
  }

  // Relationship Many to Many
  subscriptions() {
    return this.belongsToMany('App/Models/Workshop')
      .pivotTable('subscriptions')
      .withTimestamps()
  }

  getAvatarUrl({ avatar }) {
    return `${Env.get('APP_URL')}/files/${avatar || 'placeholder.png'}`
  }

}

module.exports = User;
