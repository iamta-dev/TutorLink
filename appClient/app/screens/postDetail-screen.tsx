import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, FlexStyle, ImageStyle, Platform, RefreshControl, TextStyle, ViewStyle } from "react-native"
import { useStores } from "../models/root-store"
import { Container, Header, Card, CardItem, Text, Body, View, Button, Icon, Left, Right, Title, Thumbnail } from 'native-base'
import { NavigationContainerProps } from "react-navigation"

/**
 * Props Type
 */
export interface PostDetailScreenProps extends NavigationContainerProps<{}> {
  postId: number
}

/**
 * Mocking Image
 */
export const tutor = [
  'https://www.stockvault.net//data/2011/03/19/119028/thumb16.jpg',
  'https://www.stockvault.net//data/2012/06/15/131718/thumb16.jpg',
  'https://www.stockvault.net//data/2007/03/01/101766/thumb16.jpg',
  'https://image.shutterstock.com/mosaic_250/1993499/797669914/stock-photo-grandmother-portrait-set-in-the-studio-concepts-about-seniority-797669914.jpg',
]
export const student = [
  'https://image.shutterstock.com/mosaic_250/1020994/660004024/stock-photo-happy-student-looking-at-you-with-thumbs-up-in-a-classroom-with-classmates-in-the-background-660004024.jpg',
  'https://image.shutterstock.com/mosaic_250/2797510/705449866/stock-photo-selfie-time-four-international-students-with-beaming-smiles-are-posing-for-selfie-shot-caucasian-705449866.jpg',
  'https://image.shutterstock.com/mosaic_250/1060631/564247138/stock-photo-in-the-library-pretty-female-student-with-books-working-in-a-high-school-library-564247138.jpg',
  'https://image.shutterstock.com/mosaic_250/163108/524512270/stock-photo-close-up-shot-of-young-woman-writing-notes-with-classmates-studying-in-background-students-524512270.jpg',
  'https://www.stockvault.net//data/2012/03/06/129770/thumb16.jpg',
  'https://www.stockvault.net//data/2011/10/30/127712/thumb16.jpg',
  'https://image.shutterstock.com/mosaic_250/580987/713908198/stock-photo-happy-smiling-asian-woman-working-on-laptop-computer-while-sitting-on-the-floor-with-legs-crossed-713908198.jpg',
]

/***
 * Main Component
 */
export const PostDetailScreen: React.FunctionComponent<PostDetailScreenProps> = observer((props) => {
  // Store MST
  const { studentPostStore: { getStudentPostById }, tutorJoinStore, tutorJoinStore: { getAllPostTutorByPostId } } = useStores()
  // State
  const [refreshing, setRefreshing] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [postDetail, setPostDetail] = useState({
    description: "",
    topic: "",
    user: {
      firstName: "",
      lastName: "",
      userImg: "https://st2.depositphotos.com/2777531/6975/v/450/depositphotos_69759199-stock-illustration-male-person-silhouette.jpg"
    },
    postDate: "",
  })
  // Props Mapping
  const postId = props.navigation.getParam("postId")
  // Navigation
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])
  const goTutorEnroll = () => props.navigation.navigate("tutorEnroll", { postId })
  // Function
  const onRefresh = () => {
    setRefreshing(true)
    getStudentPostById(postId)
      .then(
        ({ description, topic, postDate, user }) => {
          setRefreshing(false)
          setPostDetail({ description, topic, postDate, user })
        }
      )
      .catch(error => {
        // console.tron.logImportant(error.message)
        setRefreshing(false)
        setShowError(true)
        setErrorMessage(error.message)
      })
    setRefreshing(true)
    getAllPostTutorByPostId(props.navigation.getParam("postId"))
      .then(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        res => {
          setRefreshing(false)
        }
      )
      .catch(error => {
        // console.tron.logImportant(error.message)
        setRefreshing(false)
        setShowError(true)
        setErrorMessage(error.message)
      })
  }
  // ComponentDidMount
  useEffect(() => {
    onRefresh()
    console.log("get post detail")
  }, [])

  let tutorList
  if (showError) {
    tutorList = <Text>Error with status : {errorMessage}</Text>
  } else {
    tutorList = <FlatList
      data={tutorJoinStore.tutorJoins}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      renderItem={({ item }) =>
        <TutorItem
          data={item}
          // tutorName={`${item.user.firstName} ${item.user.lastName}`}
          // tutorImg={tutor[0]}
          // tutorDetail={item.description}
          // tutorPrice={item.price}
        />
      }
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <StudentPost
          goTutorEnroll={goTutorEnroll}
          name={postDetail.user.firstName + " " + postDetail.user.lastName}
          titleName="นักศึกษาปี 3 อากาศยาน"
          userImg={postDetail.user.userImg}
          postDetail={postDetail.description}
          postTitle={postDetail.topic}
          tutorCount={tutorJoinStore.tutorJoins.length}
        />
      }
    />
  }

  return (
    <Container>
      <MyHeader
        title="Detail"
        goBack={ goBack }
      />
      {tutorList}
    </Container>
  )
})

/**
 * Props Type
 */
export interface HeadBerProps {
  title?: string,
  goBack?: () => void
}

/**
 * Style
 */
const HEADER: ViewStyle = { height: 80, backgroundColor: '#29B6F6' }
const BACK_BTN = { marginLeft: 20, color: 'white' }
const TITLE = { fontSize: Platform.OS === 'ios' ? 25 : 20, color: 'white' }
/**
 * Component
 * @param props
 * @constructor
 */
const MyHeader: React.FunctionComponent<HeadBerProps> = props => {
  const { goBack, title } = props
  return (
    <Header style={HEADER}>
      <Left>
        <Button transparent>
          <Icon
            name="arrow-back"
            style={BACK_BTN}
            onPress={goBack}
          />
        </Button>
      </Left>
      <Body>
        <Title
          style={TITLE}>
          {title}
        </Title>
      </Body>
      <Right />
    </Header>
  )
}

const StudentPost = props => {
  const CARD: FlexStyle = { paddingBottom: 20 }
  const FLEX_ROW: ViewStyle = { flexDirection: 'row' }
  const FLEX_COL: ViewStyle = { flexDirection: 'column' }
  const TEXT_GRAY: TextStyle = { color: "gray" }
  const USER_IMG: ImageStyle = { height: 40, width: 40, marginRight: 5 }
  const JOIN_DETAIL: TextStyle = { fontSize: 15, color: '#393938' }
  const ENROLL_BTN: ViewStyle = {
    height: 40,
    width: null,
    flex: 1,
    marginHorizontal: 60,
    marginVertical: 0,
    backgroundColor: '#3375CC',
    justifyContent: 'center',
  }
  const JOIN_FLEX: FlexStyle = { margin: 20, padding: 5 }
  /**
   *  props
  */
  const { name, postDetail, userImg, postTitle, titleName, tutorCount } = props
  return (
    <Card style={CARD}>
      <CardItem style={CARD}>
        <View style={FLEX_ROW}>
          <Thumbnail style={USER_IMG} source={{ uri: userImg }}/>
          <View style={FLEX_COL}>
            <Text> {name} </Text>
            <Text note> {titleName} </Text>
          </View>
        </View>
      </CardItem>
      <CardItem>
        <Body>
          <Text style={TEXT_GRAY}>หัวเรื่อง: <Text >{postTitle}</Text></Text>
          <Text style={TEXT_GRAY}>รายละเอียด:  <Text >{postDetail}</Text></Text>
        </Body>
      </CardItem>
      <CardItem cardBody style={JOIN_FLEX}>
        <Left><Text style={JOIN_DETAIL}>ติวเตอร์เข้าร่วม {tutorCount} คน</Text></Left>
        <Right><Text style={JOIN_DETAIL}>นักเรียนเข้าร่วม 0 คน</Text></Right>
      </CardItem>
      <CardItem cardBody>
        <Button onPress={props.goTutorEnroll} style={ENROLL_BTN}>
          <Text>สมัครเป็นติวเตอร์</Text>
        </Button>
      </CardItem>
    </Card>
  )
}

export interface TutorItemProps {
  data: object
}

const IMG_USER_JOINED: ImageStyle = { width: 25, height: 25, marginRight: 2 }
const JOINED_REMAINING: TextStyle = { fontSize: 12, marginLeft: 10, color: '#566573' }
const JOIN_VIEW: FlexStyle = { marginLeft: 40 }
const DESCRIPTION_BTN: ViewStyle = {
  height: 40,
  width: null,
  flex: 1,
  marginHorizontal: 10,
  marginVertical: 0,
  backgroundColor: '#27A7E1',
  justifyContent: 'center',
}
const JOIN_BTN: ViewStyle = {
  height: 40,
  width: null,
  flex: 1,
  marginHorizontal: 10,
  marginVertical: 0,
  backgroundColor: '#3375CC',
  justifyContent: 'center',
}
const COL: FlexStyle = { flexDirection: 'column' }
const ROW: FlexStyle = { flexDirection: 'row' }
const TUTOR_JOIN_CARD: FlexStyle = { paddingBottom: 20 }
const TUTOR_IMG: ImageStyle = { height: 55, width: 55, marginRight: 5 }
const TUTOR_HEAD: FlexStyle = { flex: 8, flexDirection: 'row' }
const PRICE_ICON = { fontSize: 20, color: '#5D6D7E' }
const TUTOR_HEADBAR: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: 0,
  marginRight: 0,
}
const DESCRIPTION_TUTOR: TextStyle = { color: "gray", marginTop: 10 }
/**
 * Tutor Join Items
 * @param props
 * @constructor
 */
export const TutorItem: React.FunctionComponent<TutorItemProps> = props => {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, price, description, postDate, user } = props.data
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { phone, firstName, lastName, username, email } = user
  return (
    <Card style={TUTOR_JOIN_CARD}>
      <CardItem
        style={TUTOR_HEADBAR}>
        <View style={TUTOR_HEAD}>
          <View>
            <Thumbnail style={TUTOR_IMG} source={{ uri: user.userImg }}/>
          </View>
          <View style={COL}>
            <Text>สอนโดย {`${firstName} ${lastName} `}</Text>
            <View style={ROW}>
              <Icon type='FontAwesome' name='money' style={PRICE_ICON}/>
              <Text note>{`    ${price} บาท  `}</Text>
            </View>
            <Text style={DESCRIPTION_TUTOR}>รายละเอียด: {description}</Text>
          </View>
        </View>
      </CardItem>
      <CardItem style={JOIN_VIEW}>
        {/*<Thumbnail source={{ uri: student[0] }} style={IMG_USER_JOINED}/>*/}
        {/*<Thumbnail source={{ uri: student[1] }} style={IMG_USER_JOINED}/>*/}
        {/*<Thumbnail source={{ uri: student[2] }} style={IMG_USER_JOINED}/>*/}
        {/*<Thumbnail source={{ uri: student[3] }} style={IMG_USER_JOINED}/>*/}
        <Text style={JOINED_REMAINING}>. . . เข้าร่วมเเล้ว 0 คน</Text>
      </CardItem>
      <CardItem cardBody>
        <Button
          // onPress={() => props.history.push('/PostEnroll')}
          style={JOIN_BTN}>
          <Text>เข้าร่วม</Text>
        </Button>
        <Button
          // onPress={() => props.history.push('/PostEnroll')}
          style={DESCRIPTION_BTN}>
          <Text>รายละเอียด</Text>
        </Button>
      </CardItem>
    </Card>
  )
}
