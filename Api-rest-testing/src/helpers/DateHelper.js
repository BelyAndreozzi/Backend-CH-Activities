class DateHelper{

    getDate = () => {
        const date = new Date();
        const month = date.getMonth()+1;
        const dateFormated = date.getDate() + "/" + month + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return dateFormated;
    }
}

export { DateHelper }