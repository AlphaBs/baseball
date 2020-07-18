export class Utils {
    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static randomNumbers(length: number): Array<number> {
        let result: Array<number> = [];
        while (result.length < length) {
            let rndNumber = this.getRandomInt(length);
            if (!result.includes(rndNumber)) result.push(rndNumber);
        }
        return result;
    }
}
