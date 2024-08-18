export const arrShuffle = <T>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

export const arrUnique = <T>(array: T[]) => array.filter((value, index, array) => array.indexOf(value) === index);
