import { DateTime,formatiso } from 'luxon';


export const formatDate = (date,abbreviated)=> {


    const d = new Date(date)
    const fecha = DateTime.fromJSDate(d).setZone('America/Montevideo')
    const now = DateTime.local().setZone('America/Montevideo')
    const resultFecha = now.diff(fecha).milliseconds;
    

    const fehcainSeconds = resultFecha / 1000
    const fechainMinutes = fehcainSeconds / 60
    const fechainHours = fechainMinutes / 60
    const fechainDays = fechainHours / 24
    const fechainWeeks = fechainDays / 7


    if(abbreviated == true) {
        if( fechainMinutes < 60) {
            return `${Math.round(fechainMinutes)} m`
        } else if ( fechainHours < 24) {
            return `${ Math.round(fechainHours)} h`
        } else if(fechainDays < 7) {
            return `${ Math.round(fechainDays)} d`
        } else if( fechainWeeks > 1) {
            return `${ Math.round(fechainWeeks)} w`
        }
    } else {
        if( fechainMinutes < 60) {
            return `${Math.round(fechainMinutes)} minutes ago`
        } else if ( fechainHours < 24) {
            return `${ Math.round(fechainHours)} hours ago`
        } else if(fechainDays < 7) {
            return `${ Math.round(fechainDays)} days ago`
        } else if( fechainWeeks > 1) {
            return `${ Math.round(fechainWeeks)} weeks ago`
        }
    }
}

export const FormatHours = (date)=> {
    const fecha = new Date(date)
    const hours = fecha.getHours()
    const minutes = fecha.getMinutes()
    return hours + ":" + minutes
}