import * as React from "react"
import { ViewStyle, TouchableOpacity, TextStyle, ImageStyle, FlexStyle } from "react-native"
import { View, Body, Button, Card, CardItem, Left, Right, Text, Thumbnail } from "native-base"
import { translate } from "../../i18n/"
import { NavigationContainerProps } from "react-navigation"

/**
 * CSS Style
 */
const TEXT_BOLD: TextStyle = { fontWeight: "bold" }
const CARD: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: 0,
  marginRight: 0,
}
const JOINED_REMAINING: TextStyle = { fontSize: 12, marginLeft: 10, color: '#566573' }
const USER_IMG: ImageStyle = { height: 40, width: 40, marginRight: 5 }
const JOIN_BUTTON: ViewStyle = {
  height: 50,
  width: null,
  flex: 1,
  marginHorizontal: 10,
  marginVertical: 10,
  backgroundColor: '#3375CC',
}
const FLEX_ROW: ViewStyle = { flexDirection: 'row' }
const TEXT_GRAY: TextStyle = { color: "gray" }
const DETAIL_MARGIN: FlexStyle = { marginHorizontal: 10 }
/**
 * Mocking Data
 */
const tutor = [
  'https://www.stockvault.net//data/2011/03/19/119028/thumb16.jpg',
  'https://www.stockvault.net//data/2012/06/15/131718/thumb16.jpg',
  'https://www.stockvault.net//data/2007/03/01/101766/thumb16.jpg',
  'https://image.shutterstock.com/mosaic_250/1993499/797669914/stock-photo-grandmother-portrait-set-in-the-studio-concepts-about-seniority-797669914.jpg',
]
const student = [
  'https://image.shutterstock.com/mosaic_250/1020994/660004024/stock-photo-happy-student-looking-at-you-with-thumbs-up-in-a-classroom-with-classmates-in-the-background-660004024.jpg',
  'https://image.shutterstock.com/mosaic_250/2797510/705449866/stock-photo-selfie-time-four-international-students-with-beaming-smiles-are-posing-for-selfie-shot-caucasian-705449866.jpg',
  'https://image.shutterstock.com/mosaic_250/1060631/564247138/stock-photo-in-the-library-pretty-female-student-with-books-working-in-a-high-school-library-564247138.jpg',
  'https://image.shutterstock.com/mosaic_250/163108/524512270/stock-photo-close-up-shot-of-young-woman-writing-notes-with-classmates-studying-in-background-students-524512270.jpg',
  'https://www.stockvault.net//data/2012/03/06/129770/thumb16.jpg',
  'https://www.stockvault.net//data/2011/10/30/127712/thumb16.jpg',
  'https://image.shutterstock.com/mosaic_250/580987/713908198/stock-photo-happy-smiling-asian-woman-working-on-laptop-computer-while-sitting-on-the-floor-with-legs-crossed-713908198.jpg',
]

/**
 * Props Type
 */
export interface PostCardProps extends NavigationContainerProps {
  userName: string
  userDetail: string
  userImg: string
  postDetail: string
  postTitle: string
  postId: number
  tutorCount: number
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export const PostCard: React.FunctionComponent<PostCardProps> = props => {
  // grab the props
  const { userName, userDetail, userImg, postDetail, navigation, postTitle, postId, tutorCount } = props
  // navigate
  const goPostDetail = () => { navigation.navigate("postDetail", { postId }) }
  const goProfile = () => { navigation.navigate("otherProfile") }

  return (
    <Card>
      <CardItem
        style={CARD}>
        <View style={FLEX_ROW}>
          <View>
            <Thumbnail style={USER_IMG} source={{ uri: userImg }}/>
          </View>
          <TouchableOpacity onPress={goProfile}>
            <Text> {userName} </Text>
            <Text note> {userDetail} </Text>
          </TouchableOpacity>
        </View>
      </CardItem>
      <CardItem>
        <Body style={DETAIL_MARGIN}>
          <Text style={TEXT_BOLD}>{"   " + postTitle}</Text>
          <Text>{"   " + postDetail}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Left>
          <Text>{translate("common.tutor")} ({tutorCount})</Text>
        </Left>
        <Right>
          <CardItem>
            {/*<Thumbnail source={{ uri: tutor[0] }} style={IMG_USER_JOINED}/>*/}
            {/*<Thumbnail source={{ uri: tutor[1] }} style={IMG_USER_JOINED}/>*/}
            {/*<Thumbnail source={{ uri: tutor[2] }} style={IMG_USER_JOINED}/>*/}
            {/*<Thumbnail source={{ uri: tutor[3] }} style={IMG_USER_JOINED}/>*/}
            <Text style={JOINED_REMAINING}>. . . เข้าร่วมเเล้ว {tutorCount} คน</Text>
          </CardItem>
        </Right>
      </CardItem>
      <CardItem>
        <Left><Text>{translate("common.student")} (0)</Text></Left>
        <Right>
          <CardItem>
            {/*<Thumbnail source={{ uri: student[0] }} style={IMG_USER_JOINED}/>*/}
            {/*<Thumbnail source={{ uri: student[1] }} style={IMG_USER_JOINED}/>*/}
            {/*<Thumbnail source={{ uri: student[2] }} style={IMG_USER_JOINED}/>*/}
            {/*<Thumbnail source={{ uri: student[3] }} style={IMG_USER_JOINED}/>*/}
            <Text style={JOINED_REMAINING}>. . . เข้าร่วมเเล้ว 0 คน</Text>
          </CardItem>
        </Right>
      </CardItem>
      <CardItem cardBody>
        <Button onPress={goPostDetail} full style={JOIN_BUTTON}>
          <Text>เข้าร่วมตอนนี้</Text>
        </Button>
      </CardItem>
    </Card>
  )
}
