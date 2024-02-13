export const Order_contactsF = (contacts)=> {
    const order_contacts = contacts.sort((a,b)=> {
        const fecha_a = new Date(a.time_last_message)
        const fecha_b = new Date(b.time_last_message)

        return fecha_b - fecha_a;
        
    })


    return order_contacts
}