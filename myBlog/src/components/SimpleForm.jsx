// Importaciones de hooks y estilos
import React from "react";
import { useForm } from "react-hook-form"; 
import './SimpleForm.css';

// Construcción del componente SimpleForm
export default function SimpleForm(){
    // Definición de estados y acciones del formulario
    const { register, handleSubmit, formState: {errors} } = useForm();

    // Definición de función que confirma el envío del formulario en consola
    const onSubmit = data => {
        console.log(data)
        console.log(`${data.nombre} ha enviado su información`)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}> 
        {/* Campo para introducir nombre: validación de formato y manejo de errores */}
            <input type="text" placeholder="Nombre" {...register("nombre", { required: true, minLength: 5})}/>
            {errors.nombre?.type === 'required' && <p>El nombre es requerido </p>}
            {errors.nombre?.type === 'minLength' && <p>El nombre debe tener al menos 5 letras </p>}

        {/* Campo para introducir correo: validación de formato y manejo de errores */}
            <input type="text" placeholder="Correo" {...register("correo")}/>
            <input className={errors.direccion ? 'input-error':''} type="text" placeholder="Direccion" {...register("direccion", { required: true, minLength: 10})}/>
            {errors.direccion && 
                <span className="error-message"> 
                    { errors.direccion.type === 'required'? 'Campo obligatorio':'Debe tener al menos 10 caracteres'} 
                </span>
            }

        {/* Campo para introducir teléfono: validación de formato y manejo de errores */}
            <input type="text" placeholder="Telefono" {...register("phone")}/>

        {/* Botón de envío */}
            <button type="submit">Enviar</button>
        </form>
    );
}