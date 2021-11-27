class Utils {

    static checkNullInput(input) {
        if (!input || /^\s*$/.test(input)) {
            return true;
        }
    }

}

export default Utils