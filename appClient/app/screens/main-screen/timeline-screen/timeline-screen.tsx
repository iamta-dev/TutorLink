import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList, Platform, TextStyle, FlexStyle, RefreshControl, ActivityIndicator } from "react-native"
import { Container, Header, Text, View, Button, Left, ListItem, Thumbnail, Icon } from 'native-base'
import { PostCard } from "../../../components"
import { NavigationContainerProps } from "react-navigation"
import { StudentPostStore } from "../../../models/student-post-store"
import { useStores } from "../../../models/root-store"

/**
 * Props Type
 */
export interface TimelineScreenProps extends NavigationContainerProps {
  studentPostStore: StudentPostStore,
}

/**
 * CSS Style
 */
const POST_VIEW: ViewStyle = {
  borderWidth: 0.4,
  borderColor: '#F2F3F4',
  margin: 6,
  marginBottom: 3,
}
const TEXT_POST_FLEX: FlexStyle = { marginTop: 15, marginLeft: 5 }
const TEXT_POST: TextStyle = { ...TEXT_POST_FLEX, fontSize: 16 }

/***
 * Main Component
 */
export const TimelineScreen: React.FunctionComponent<TimelineScreenProps> = observer((props) => {
  // Store MST
  const { studentPostStore, studentPostStore: { getStudentPosts, getMoreStudentPosts } } = useStores()
  // Function
  const goCreatePost = () => { props.navigation.navigate("createPost") }
  const goSearchPost = () => { props.navigation.navigate("searchPost") }
  // Props
  const { navigation } = props
  // State
  const [refreshing, setRefreshing] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false) // for load more post
  const [page, setPage] = useState(0)
  // Function
  const loadMorePost = () => {
    setLoading(true)
    getMoreStudentPosts(page + 1)
      .then(() => {
        setLoading(false)
        setPage(page + 1)
      })
      .catch(error => {
        setLoading(false)
        setShowError(true)
        setErrorMessage(error.message)
      }
      )
  }
  const onRefresh = () => {
    setPage(0)
    setRefreshing(true)
    getStudentPosts()
      .then(() => setRefreshing(false))
      .catch(error => {
        setRefreshing(false)
        setShowError(true)
        setErrorMessage(error.message)
      })
  }
  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator/>
    } else {
      return <View></View>
    }
  }
  const onEndReached = () => {
    if (!loading) {
      loadMorePost() // fetching new data, ended with this.setState({waiting: false});
    }
  }
  // ComponentDidMount
  useEffect(() => {
    onRefresh()
    console.log("get post")
  }, [])

  let info
  if (showError) {
    info = <Text>Error with status : {errorMessage}</Text>
  } else if (studentPostStore.studentPosts.length === 0) {
    info = <Text>No data found</Text>
  } else {
    info = <FlatList
      data={studentPostStore.studentPosts}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      ListFooterComponent={renderFooter}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      renderItem={({ item }) =>
        <PostCard
          postId={item.id}
          userName={item.user.firstName + " " + item.user.lastName}
          userDetail={item.user.shortDetail}
          userImg={item.user.userImg}
          postTitle={item.topic}
          tutorCount={item.tutorCount}
          postDetail= {item.description}
          navigation={navigation}
        />
      }
      keyExtractor={item => item.id.toString()}
    />
  }
  return (
    <Container>
      <TimelineHeader goSearchPost={goSearchPost}/>
      <ListItem avatar noBorder>
        <Left>
          <Thumbnail source={{ uri: 'https://image.shutterstock.com/mosaic_250/2936380/613759379/stock-photo-happy-cheerful-young-woman-wearing-her-red-hair-in-bun-rejoicing-at-positive-news-or-birthday-gift-613759379.jpg', }}/>
          <Button transparent onPress={goCreatePost}>
            <Text note style={TEXT_POST}>ตอนนี้คุณอยากเรียน ?</Text>
          </Button>
        </Left>
      </ListItem>
      <View style={POST_VIEW} />
      {info}
    </Container>
  )
})

/***
 * HEADER Component
 */

/**
 * Props Type
 */
export interface TimelineHeaderProps {
  goSearchPost: () => void
}

/**
 * CSS Style
 */
const HEADER: ViewStyle = {
  height: 80,
  backgroundColor: '#29B6F6',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
const FULL: ViewStyle = { flex: 1 }
const HEADER_TEXT: TextStyle = {
  fontSize: Platform.OS === 'ios' ? 30 : 30,
  color: 'white',
  fontWeight: 'bold',
}
const FIND_TEXT: TextStyle = { color: 'white', fontSize: 14 }
const FIND_BUTTON: ViewStyle = { borderColor: '#29B6F6', backgroundColor: '#29B6F6' }
const TEXT_WHITE: TextStyle = { color: 'white' }

/**
 * Header Component
 * @param props
 * @constructor
 */
const TimelineHeader: React.FunctionComponent<TimelineHeaderProps> = props => {
  const { goSearchPost } = props
  return (
    <Header
      style={HEADER}>
      <View style={FULL}>
        <Button transparent >
          <Text
            style={HEADER_TEXT}>
            TutorLink
          </Text>
        </Button>
      </View>
      <View>
        <Button
          onPress={ goSearchPost }
          vertical
          bordered
          style={FIND_BUTTON}>
          <Icon type="FontAwesome" name="search" style={TEXT_WHITE} />
          <Text style={FIND_TEXT}>ค้นหา</Text>
        </Button>
      </View>
    </Header>
  )
}
