// src/Services/KeyService.ts

import Key from '../Domain/Key/Key';
import KeyFactory from '../Domain/Key/KeyFactory';
import IKey from '../Interfaces/IKey';

class KeyService {
  private createKeyDomain(key: IKey | null): Key | null {
    if (key) {
      return new Key(
        key.value,
        key.owner,
        key.type,
        key.id,
      );
    }
    return null;
  }

  public async register(key: IKey) {
    const typedKey = KeyFactory.create(key);
    // Saving example
    const newkey: IKey = {
      value: typedKey.value,
      owner: key.owner,
      type: typedKey.type,
      id: '633ec9fa3df977e30e993492',
    };
    return this.createKeyDomain(newkey);
  }
  
  public async getByOwner(owner: string) {
    const keyODM = new KeyODM();
    const keys = await keyODM.findByOwner(owner);
    const keySet = keys.map((key) => this.createKeyDomain(key));
    return keySet;
}

}

export default KeyService;