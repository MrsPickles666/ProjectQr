const crearUsu = async (formData, token) => {
    try {
        const response = await fetch('http://192.168.1.2:3000/usuario/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        });
        if(!response.ok){
            throw new Error('Error al crear el usuario')
        }
        const responseData = await response.json();
        console.log(responseData);

        return responseData;
    }catch{error}
    console.log('Error al enviar los datos al backend:', error);
    throw error;
}

export default crearUsu;