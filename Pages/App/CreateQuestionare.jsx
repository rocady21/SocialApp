import { useEffect, useState } from "react"
import { StyleSheet, View,Text,ScrollView,TextInput, TouchableOpacity } from "react-native"
import Select from "../../components/CreateQuestionare.jsx/Select"
import { useQuestionsSlice } from "../../hooks/useQuestionsSlice"
import IonIcons from "react-native-vector-icons/Ionicons"
import ModalCreateQuestion from "../../components/CreateQuestionare.jsx/ModalCreateQuestion"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
const CreateQuestionare = ()=> {


    const {category,handleLoadEntitiesFromCat,entitiesfromCateogry} = useQuestionsSlice()
    const [cateogry_selected,setCategorySelected] = useState(undefined)
    const [modalCreateQuestion,setModalCreateQuestion] = useState(false)
    const [stateForm,setStateForm] = useState({
        nombre:"",
        descripcion:"",
        max_p:null,
        fin_in_days:"",
        id_insignia:null,
        id_entidad:null,
        preguntas:[]
    })

    useEffect(()=> {
        if(cateogry_selected !== undefined) {
            handleLoadEntitiesFromCat(cateogry_selected)
        }

    },[cateogry_selected])
    

    const onChangeValue = (key,value)=> {
        setStateForm({
            ...stateForm,
            [key]:value
        })
    }

    const handleModalCreateQuestion = ()=> {
        setModalCreateQuestion(!modalCreateQuestion)
    }

    return ( 
        <View style={styles.padre}>
            <View style={styles.head}>
                <Text style={{fontSize:18,fontWeight:"700",textAlign:"center"}}>Crear Cuestionario</Text>
            </View>
            <ScrollView style={styles.content}>
                <TextInput
                    style={styles.textInput}
                    placeholder="name"
                    onChangeText={(text)=> onChangeValue("nombre",text)}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Max points"
                    keyboardType="numeric"
                    onChangeText={(text)=> onChangeValue("max_p",text)}
                />

                <Select setCategorySelected={(id)=>setCategorySelected(id)} options={category} />
                
                <Select cateogry_selected={cateogry_selected} onChangeValue={(key,id)=>onChangeValue(key,id)} options={entitiesfromCateogry} />


                <View style={styles.AddQuestions}>
                    <View style={[styles.head,{width:"100%"}]}><Text style={{fontWeight:"700",fontSize:16}}>Crea las Preguntas!!</Text></View>
                    <View style={styles.questions}>
                        <View style={styles.question}>
                            <TouchableOpacity>
                                <Text>Quien era Luffy??</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonDeleteQuestion}>
                                <SimpleLineIcons name="trash" size={16} style={{fontWeight:"800"}} color="white" />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity style={styles.buttonAdd} onPress={handleModalCreateQuestion}>
                        <IonIcons name="add-outline" size={20} />
                    </TouchableOpacity>


                </View>
            </ScrollView>
            <ModalCreateQuestion handleModalCreateQuestion={handleModalCreateQuestion} modalCreateQuestion={modalCreateQuestion} />
            
        </View>
    )
}

const styles = StyleSheet.create({
    padre:{
        position:"relative",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        width:"100%",
        height:"100%",
        flex:1,
    },
    head:{
        marginTop:20,
        alignSelf:"center",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white",
        borderRadius:15,
        width:"90%",
        height:50,
    },
    content:{
        marginTop:30,
        width:"75%",
        alignSelf:"center",
        display:"flex",
        flexDirection:"column",
    },
    textInput:{
        marginVertical:10,
        backgroundColor:"white",
        borderRadius:5,
        paddingVertical:5,
        paddingHorizontal:10,
        width:"100%",
        borderWidth:2,
        borderColor:"#C1C1C1",
        color:"#C1C1C1"
    },
    AddQuestions:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
    },
    buttonAdd:{
        marginTop:15,
        alignSelf:"center",
        width:35,
        height:35,
        borderRadius:50,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#DDDDDD"
    },
    questions:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
    },
    question:{
        marginVertical:15,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        padding:15,
        backgroundColor:"white",
        borderRadius:15,
        borderWidth:1,
        borderColor:"#D5D5D5"
    },
    buttonDeleteQuestion:{
        padding:7,
        borderRadius:100,
        backgroundColor:"#FF4E4E"
    }
})


export default CreateQuestionare