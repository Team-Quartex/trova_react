const fetchSuggetions = async()=>{
    try {
        const response = await fetch("/usersdata.json")
        if(response.ok){
            return response.json();
        }
    } catch (error) {
        throw new Error(error.message);
    }
}


export {fetchSuggetions}