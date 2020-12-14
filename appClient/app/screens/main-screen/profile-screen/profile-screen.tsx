import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, Dimensions, StyleSheet, Platform, StatusBar, ImageBackground, Image, FlatList, ViewStyle, FlexStyle, TextStyle, } from "react-native"
import { Header, Text, View, Button, Icon, Container, } from "native-base"
import { PostCard } from "../../../components"
import { NavigationContainerProps } from "react-navigation"
import { useStores } from "../../../models/root-store"
/**
 * CSS
 */
const s = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  coverBio: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  // eslint-disable-next-line react-native/no-color-literals
  coverContainer: {
    backgroundColor: '#FFF',
    marginBottom: 5,
    paddingBottom: 0,
    position: 'relative',
  },
  coverImage: {
    height: Dimensions.get('window').width * (3 / 4),
    width: Dimensions.get('window').width,
  },
  // eslint-disable-next-line react-native/no-color-literals
  coverMetaContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 10,
    paddingLeft: 135,
  },
  // eslint-disable-next-line react-native/no-color-literals
  coverName: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  // eslint-disable-next-line react-native/no-color-literals
  coverTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // eslint-disable-next-line react-native/no-color-literals
  coverTitleContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 45,
  },
  // eslint-disable-next-line react-native/no-color-literals
  profileImage: {
    borderColor: '#FFF',
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110,
  },
  profileImageContainer: {
    bottom: -30,
    left: 10,
    position: 'absolute',
  },
})
const INNER_VIEW: ViewStyle = { padding: 30, paddingBottom: 5 }
const HEAD_BIO: ViewStyle = {
  flexDirection: 'row',
  alignContent: 'flex-start',
  marginVertical: 5,
  marginHorizontal: 15
}
const BIO_ICON = { color: '#3375CC', fontSize: 27, margin: 10, marginTop: 0, width: 30 }
const SUB_HEAD: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: 30,
  marginTop: 0,
}
const BOLD_LINE: TextStyle = { fontWeight: 'bold', textDecorationLine: 'underline' }
const FLEX_COL: FlexStyle = { flexDirection: 'column' }

/**
 * Props Type
 */
export interface ProfileScreenProps extends NavigationContainerProps {
}

/**
 * Main Component
 */
export const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = observer((props) => {
  // Store
  const { studentPostStore, studentPostStore: { getStudentPosts } } = useStores()
  const { userStore: { getCurrentUser } } = useStores()
  // States
  const [refreshing, setRefreshing] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [user, setUser] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    regDate: "",
    userImg: "https://st2.depositphotos.com/2777531/6975/v/450/depositphotos_69759199-stock-illustration-male-person-silhouette.jpg"
  })
  // Props
  const { navigation } = props
  const { firstName, lastName, phone, username, email, regDate, userImg, shortDetail } = user
  // Navigation
  const goSearchPost = () => { props.navigation.navigate("profileSetting") }
  const goTeachingHistory = () => { props.navigation.navigate("teachingHistory") }
  // ComponentDidMount
  // @ts-ignore
  useEffect(() => {
    setRefreshing(true)
    // API
    // @ts-ignore
    getCurrentUser()
      .then(user => setUser(user))
      .catch(error => {
        console.tron.logImportant(error)
        setRefreshing(false)
      })
    // API
    getStudentPosts()
      .catch(error => {
        // console.tron.logImportant(error.message)
        setShowError(true)
        setErrorMessage(error.message)
      })
    setRefreshing(false)
    console.log("get post")
    // console.log(studentPostStore.studentPosts)
  }, [])

  const headProfile = <View style={s.coverContainer}>
    <ImageBackground source={{ uri: 'https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' }} style={s.coverImage}>
      <View style={s.coverTitleContainer}>
        <Text style={s.coverTitle} />
      </View>
      <View style={s.coverMetaContainer}>
        <Text style={s.coverName}>{firstName + " " + lastName}</Text>
        <Text style={s.coverBio}>{username}</Text>
      </View>
      <View style={s.profileImageContainer}>
        <Image source={{ uri: userImg, }} style={s.profileImage}/>
      </View>
    </ImageBackground>
    <View style={INNER_VIEW}>
      <View style={HEAD_BIO}>
        <Icon type="FontAwesome" name="child" style={BIO_ICON} />
        <Text>{shortDetail}</Text>
      </View>
      <View style={HEAD_BIO}>
        <Icon type="Entypo" name="graduation-cap" style={BIO_ICON} />
        <Text>{email}</Text>
      </View>
      <View style={HEAD_BIO}>
        <Icon type="FontAwesome" name="phone" style={BIO_ICON} />
        <Text>{phone}</Text>
      </View>
      <View style={HEAD_BIO}>
        <Icon type="Entypo" name="add-user" style={BIO_ICON} />
        <Text>สมัครมาแล้ว 12 วัน</Text>
      </View>
    </View>
    <View style={SUB_HEAD}>
      <TouchableOpacity onPress={goTeachingHistory}>
        <View style={FLEX_COL}>
          <Text style={BOLD_LINE}>ความคิดเห็น</Text>
          <Text>(2 ความคิดเห็น)</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={goTeachingHistory}>
        <View style={FLEX_COL}>
          <Text style={BOLD_LINE}>ประวัติการสอน</Text>
          <Text>(4 รายวิชา)</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>

  let info
  if (showError) {
    info = <Text>Error with status : {errorMessage}</Text>
  } else if (refreshing) {
    info = <Text>Loading...</Text>
  } else if (studentPostStore.studentPosts.length === 0) {
    info = <Text>No data found</Text>
  } else {
    info = <FlatList
      data={studentPostStore.studentPosts}
      renderItem={({ item }) =>
        <PostCard
          userName={`${item.user.firstName} ${item.user.lastName}`}
          userDetail="สาขาวิศวกรรมคอมพิวเตอร์"
          tutorCount={item.tutorCount}
          postId={item.id}
          userImg="https://image.shutterstock.com/mosaic_250/2936380/640011838/stock-photo-handsome-unshaven-young-dark-skinned-male-laughing-out-loud-at-funny-meme-he-found-on-internet-640011838.jpg"
          postTitle={item.topic}
          postDetail={item.description}
          navigation={navigation}
        />
      }
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        headProfile
      }
    />
  }
  return (
    <Container>
      <StatusBar backgroundColor="#29B6F6" barStyle="light-content" />
      <MyHeader title='โปรไฟล์' goSearchPost={goSearchPost} />
      {info}
    </Container>
  )
})

/**
 * HEADER COMPONENT
 */
const PROFILE_HEADER: ViewStyle = {
  height: 80,
  backgroundColor: "#29B6F6",
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
const HEAD_TEXT_CENTER: ViewStyle = { width: 70 }
const HEADER_BAR: TextStyle = {
  fontSize: Platform.OS === 'ios' ? 30 : 30,
  color: 'white',
  fontWeight: 'bold',
}
const EDIT_BTN: ViewStyle = { borderColor: '#29B6F6', backgroundColor: '#29B6F6' }

// Props Type
export interface HeadBerProps {
  title?: string,
  goSearchPost?: () => void
}

/**
 * @param props
 * @constructor
 */
const MyHeader: React.FunctionComponent<HeadBerProps> = props => {
  return (
    <Header style={PROFILE_HEADER}>
      <View style={HEAD_TEXT_CENTER}/>
      <View>
        <Text style={HEADER_BAR}>{props.title}</Text>
      </View>
      <View style={HEAD_TEXT_CENTER}>
        <Button onPress={props.goSearchPost} vertical bordered style={EDIT_BTN}>
          <Icon type="MaterialCommunityIcons" name="account-edit" style={HEADER_BAR} />
        </Button>
      </View>
    </Header>
  )
}
