import { useEffect, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"



const Select = ({setCategorySelected,options,onChangeValue,cateogry_selected})=> {


    const [stateSelect,setStateSelect] = useState(false)
    const [defaultOption,setDefaultOption] = useState(undefined)
    const [ChangeColor,setChangeColor] = useState(false)

    const handleModal = ()=> {
        setStateSelect(!stateSelect)
        setChangeColor(false)

    }
    
    useEffect(()=> {
        if(cateogry_selected !== undefined && defaultOption !== undefined ) {
            setDefaultOption(undefined)
            onChangeValue("id_entidad",null)
        }
    },[cateogry_selected])

    const selectOption = (opt)=> {
        setChangeColor(true)
        setDefaultOption(opt)
        if(opt !== undefined && setCategorySelected) {
            setCategorySelected(opt.id)
        } else if(opt !== undefined && onChangeValue) {
            onChangeValue("id_entidad",opt.id)
        }
        setTimeout(() => {
            handleModal()       
        }, 50);
    }

    return (
        <View style={styles.select}>
            {
                stateSelect === false ?
            <TouchableOpacity onPress={handleModal}>
                <Text> {defaultOption === undefined? "Select Option" : defaultOption.nombre} </Text>
            </TouchableOpacity> 
            : stateSelect === true &&
            <View style={styles.options}>
                <TouchableOpacity style={{marginBottom:8,}} onPress={()=> selectOption(undefined)}>
                    <Text> Select Option </Text>
                </TouchableOpacity> 
                {
                    options.map((opt,index)=> {
                        return <TouchableOpacity style={{width:"100%",height:30,backgroundColor: ChangeColor === true && opt === defaultOption?  "#2C9FFF" : "white",padding:5}} options key={index} onPress={()=> selectOption(opt)}>
                            <Text style={{color:ChangeColor === true && opt === defaultOption?  "white" : "black"}}>{opt.nombre}</Text>
                        </TouchableOpacity>
                    })
                }
            </View>

            }


            

        </View>
    )
}


const styles = StyleSheet.create({
    select:{
        marginTop:15,
        backgroundColor:"white",
        paddingVertical:8,
        paddingHorizontal:15,
        width:"100%",
    },
    options:{
        backgroundColor:"white",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start"

    },

})


export default Select