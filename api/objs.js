const crearObj = async (formData, token) => {
    console.log('Token:', token); // Agregar esta línea para imprimir el token en la consola
    
    try {
        const response = await fetch('http://localhost:3000/objeto/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Aquí se incluye el token en el encabezado de autorización
            },
            body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
            throw new Error('Error al enviar los datos del objeto');
        } 
        
        const responseData = await response.json();
        console.log(responseData);

        return responseData;
    } catch (error) {
        console.error('Error al enviar los datos al backend:', error);
        throw error;
    }
};

export default crearObj;
