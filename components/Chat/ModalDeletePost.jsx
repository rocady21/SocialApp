import { StyleSheet,Modal,View,Text,TouchableOpacity } from "react-native"
import { useMessageSlice } from "../../hooks/useMessagesSlice";


const ModalDeletePost = ({stateModal,setModalDelete,id_chat})=> {

    const {DeleteChat} = useMessageSlice()

    const handleDeleteChat = ()=> {
        DeleteChat(id_chat)
        setModalDelete(false)
    }
    
    return(
        <Modal
        animationType="slide"
        transparent={true}
        style={styles.modal}
        visible={stateModal}
        onRequestClose={() => {
            setModalDelete(false);
        }}>
            <View style={styles.padreModal}>
                <Text style={{fontWeight:"500",fontSize:18}}>¿Seguro que desea borrar este chat?</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={()=> setModalDelete(false)} style={styles.cancel}>
                        <Text >Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteChat} style={styles.accept}>
                        <Text style={{color:"white",fontWeight:"600"}} >Eliminar</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </Modal>)
}

const styles = StyleSheet.create({
    modal:{
        width:"100%",
        flex:1,
        display:"flex",
        justifyContent:"center"
    },
    padreModal:{
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.23,
        shadowRadius: 11.78,
        elevation: 15,
        margin:"auto",
        marginTop:"auto",
        marginBottom:"auto",
        alignSelf:"center",
        borderRadius:15,
        display:"flex",
        flexDirection:"col",
        padding:15,
        alignContent:"center",
        backgroundColor:"white"
    },
    buttons:{
        marginTop:8,
        alignSelf:"flex-end",
        display:"flex",
        flexDirection:"row"
    },
    cancel:{
        padding:5,
        borderColor:"#DFDFDF",
        borderWidth:1,
        borderRadius:3,
        marginRight:10

    },
    accept:{
        padding:5,
        borderRadius:3,
        backgroundColor:"#CD0000"
        
    }
})

export default ModalDeletePost