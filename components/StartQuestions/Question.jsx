import { useEffect, useState } from "react"
import { Text, View,StyleSheet,TouchableOpacity } from "react-native"
import { useQuestionsSlice } from "../../hooks/useQuestionsSlice";



const QuestionComponent = ({data}) => {
    const {NextQuestion,currentQuestion,questions,cuest_user,InsertResponse} = useQuestionsSlice()
    const [stateOptions, setStateOptions] = useState('');
    const [w, set_w] = useState(100)
    
    useEffect(() => {
        const interval_func = () => {
            set_w(prevW => prevW - 20); 
        };

        const interval = setInterval(interval_func, 1000);

        const timeout_func = async () => {
            const resp = await InsertResponse(cuest_user)

            if(resp === true) {
                NextQuestion()
                clearInterval(interval);
            }
        };

        const timeout = setTimeout(timeout_func, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            set_w(100)
        };
    }, [data]);


    const onSelectedOption = async(option)=> {
        setStateOptions(option.texto)
        const resp = await InsertResponse(cuest_user,option.id)
        if(resp === true) {
            NextQuestion()
        }

    }


    const styles_charge_time = StyleSheet.create({
        ChargeTime:{
            width:w + "%",
            zIndex:100,
            padding:4,
            backgroundColor:"#00A024",
            borderRadius:15,
            transition: "width 0.5s ease-out", // Agrega la transición CSS
        },
    })
    
    return <View style={styles.padre}>
        
        <View style={styles.header}>
            <View style={styles.time}>
                <View style={[styles_charge_time.ChargeTime]}></View>
            </View>
            <View style={styles.info_q}>
                <Text> {currentQuestion + "/" + questions.length } </Text>
                <Text> {data.puntos} </Text>

            </View>
        </View>
        <View style={styles.question}>
            <Text style={{fontSize:20,fontWeight:"400"}}> {data.texto} </Text>
        </View>

        <View style={styles.options}>


            {
                data.opciones && data.opciones.map((opt,index)=> {
                    return <TouchableOpacity key={index} onPress={()=>onSelectedOption(opt)} style={[styles.option, {backgroundColor: stateOptions === opt.texto ? "#00D41D" : "white"}]}>
                    <Text> {opt.texto} </Text>
                </TouchableOpacity>
                })
            }

        </View>

    </View>
}

const styles = StyleSheet.create({
    padre:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        width:"100%",
        padding:15
    },
    header:{
        display:"flex",
        flexDirection:"column",
        width:"100%"
    },
    question:{
        marginTop:100,
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        display:"flex",
        flexDirection:"row",
        padding:25,
        justifyContent:"center",
        alignContent:"center",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.6,
        shadowRadius: 6.65,
        shadowColor:"gray",
        elevation: 8,
    },
    options:{
        width:"100%",
        padding:15,
        backgroundColor:"white",
        display:"flex",
        flexDirection:"column",
        marginTop:"5%",
        alignItems:"center",
        borderRadius:5,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.6,
        shadowRadius: 6.65,
        shadowColor:"gray",
        elevation: 8,
        marginBottom:25
    },
    time:{
        width:"100%",
        borderRadius:15,
        backgroundColor:"#DEDEDE",
        zIndex:4,
        padding:3
    },
    info_q:{
        width:"100%",
        marginVertical:15,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15
    },
    option:{
        padding:15,
        width:"100%",
        backgroundColor:"white",
        borderRadius:1000,
        borderWidth:1,
        borderColor:"#DEDEDE",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10

    }
})

export default QuestionComponent

