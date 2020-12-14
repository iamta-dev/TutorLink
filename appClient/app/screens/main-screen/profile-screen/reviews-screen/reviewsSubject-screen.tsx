import React from "react"
import { observer } from "mobx-react-lite"
import { Image, TouchableOpacity, ScrollView, StyleSheet, Platform, StatusBar } from "react-native"
import {
  Header,
  Text,
  View,
  List,
  Container,
  Button,
  Icon,
} from 'native-base'
import { NavigationScreenProp } from "react-navigation"


export interface ReviewsSubjectScreenProps {
  navigation: NavigationScreenProp<{}>
}


export const ReviewsSubjectScreen: React.FunctionComponent<ReviewsSubjectScreenProps> = observer((props) => {

  const { navigation } = props
  const goBack = React.useMemo(() => () => navigation.goBack(null), [props.navigation])
  const goReviewsSubject = () => { props.navigation.navigate("reviewsSubject") }
  const userImg = [
    'https://image.shutterstock.com/mosaic_250/1020994/660004024/stock-photo-happy-student-looking-at-you-with-thumbs-up-in-a-classroom-with-classmates-in-the-background-660004024.jpg',
    'https://image.shutterstock.com/mosaic_250/2797510/705449866/stock-photo-selfie-time-four-international-students-with-beaming-smiles-are-posing-for-selfie-shot-caucasian-705449866.jpg',
    'https://image.shutterstock.com/mosaic_250/1060631/564247138/stock-photo-in-the-library-pretty-female-student-with-books-working-in-a-high-school-library-564247138.jpg',
    'https://image.shutterstock.com/mosaic_250/163108/524512270/stock-photo-close-up-shot-of-young-woman-writing-notes-with-classmates-studying-in-background-students-524512270.jpg',
    'https://www.stockvault.net//data/2012/03/06/129770/thumb16.jpg',
    'https://www.stockvault.net//data/2011/10/30/127712/thumb16.jpg',
    'https://image.shutterstock.com/mosaic_250/580987/713908198/stock-photo-happy-smiling-asian-woman-working-on-laptop-computer-while-sitting-on-the-floor-with-legs-crossed-713908198.jpg',
  ]
  return (
    <>
      {/* light-content ,dark-content*/}
      <Container style={{ backgroundColor: '#fcfcfc' }}>
        <StatusBar backgroundColor="#29B6F6" barStyle="light-content" />
        <HeadBer theme="#29B6F6" title='เคมี 2' goBackPage={goBack} />

        <ScrollView>

          <List>
            <View>
              <Text style={{ marginHorizontal: 20, marginVertical: 10 }}>ความคิดเห็นล่าสุด</Text>
              <View style={{ paddingHorizontal: 0 }}>
                <ReviewsItem uriImg={userImg[1]} subjectName="Malinee Leesonta" reviews="อาจารย์น่ารักครับละลายเเล้ว สอนเข้าใจมากเลยครับ" dateTime="18:00 19/08/61" goReviewsSubject={goReviewsSubject} />
                <ReviewsItem uriImg={userImg[5]} subjectName="Isaman Sangbumrung" reviews="อาจารย์น่ารักมุ้งมิ้ง อีกเสียงครับ" dateTime="19:00 19/08/61" goReviewsSubject={goReviewsSubject} />
              </View>
            </View>
            <View>
              <Text style={{ marginHorizontal: 20, marginVertical: 10 }}>ความคิดเห็นก่อนหน้า</Text>
              <View style={{ paddingHorizontal: 0 }}>
                <ReviewsItem uriImg={userImg[2]} subjectName="Mint Plongmai" reviews="สอนดีมากครับ :)" dateTime="21:00 01/02/63" goReviewsSubject={goReviewsSubject} />
                <ReviewsItem uriImg={userImg[3]} subjectName="Parin Sornlertlamvanich" reviews="สอนเนื้อหาตรงข้อสอบกลางภาคมากครับ *_*" dateTime="06:00 21/08/62" goReviewsSubject={goReviewsSubject} />
                <ReviewsItem uriImg={userImg[4]} subjectName="Mutita Kitpaiboonchai" reviews="สอนสนุกมากครับ ^-^" dateTime="01:00 02/12/63" goReviewsSubject={goReviewsSubject} />
              </View>
            </View>
          </List>
        </ScrollView>

      </Container>
    </>
  )
})

const styles = StyleSheet.create({
  cardRounded: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 15,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#C6C6C6',
    shadowOffset: { height: 5, width: 0 },
    backgroundColor: '#FFFFFF',
  }
})


export interface ReviewsItemProps {
  uriImg?: string,
  subjectName?: string,
  dateTime?: string,
  reviews?: string,
  goReviewsSubject?: () => void

}


const ReviewsItem: React.FunctionComponent<ReviewsItemProps> = props => {
  return (
    <>
      <View style={styles.cardRounded}>
        <TouchableOpacity onPress={props.goReviewsSubject} >
          <View style={{ flexDirection: 'row', }}>

            <View >
              <Image source={{ uri: props.uriImg }}
                style={{
                  marginRight: 5,
                  borderColor: '#FFF',
                  borderRadius: 20,
                  borderWidth: 3,
                  height: 40,
                  width: 40,
                }} />
            </View>

            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'stretch',

            }}>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <View>
                  <Text style={{ fontWeight: 'bold', }}>
                    {props.subjectName}
                  </Text>
                </View>
                <View></View>

              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>

                <View style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}>
                    <Icon type="Ionicons" name="ios-star" style={{ fontSize: 20, color: '#FFCD34', marginLeft: 0, marginRight: 5 }}></Icon>
                    <Icon type="Ionicons" name="ios-star" style={{ fontSize: 20, color: '#FFCD34', marginHorizontal: 5 }}></Icon>
                    <Icon type="Ionicons" name="ios-star-half" style={{ fontSize: 20, color: '#FFCD34', marginHorizontal: 5 }}></Icon>
                    <Icon type="Ionicons" name="ios-star-outline" style={{ fontSize: 20, color: '#FFCD34', marginHorizontal: 5 }}></Icon>
                    <Icon type="Ionicons" name="ios-star-outline" style={{ fontSize: 20, color: '#FFCD34', marginHorizontal: 5 }}></Icon>

                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <Text style={{ color: '#000000' }}>
                      {props.reviews}
                    </Text>
                  </View>
                </View>
                <View></View>

              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>

                <View></View>
                <View>
                  <Text note>
                    {props.dateTime}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}
export interface HeadBerProps {
  theme?: string,
  title?: string,
  goBackPage?: () => void
}

const HeadBer: React.FunctionComponent<HeadBerProps> = props => {
  return (
    <Header
      style={{
        height: 80,
        backgroundColor: props.theme,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

      <View style={{ width: 70 }}>
        <Button
          onPress={props.goBackPage}
          vertical
          bordered
          style={{ borderColor: '#29B6F6', backgroundColor: '#29B6F6' }}>
          <Icon type="AntDesign" name="arrowleft" style={{ color: 'white', fontSize: Platform.OS === 'ios' ? 30 : 38, }} />
        </Button>
      </View>

      <View>
        <Text
          style={{
            fontSize: Platform.OS === 'ios' ? 25 : 25,
            color: 'white',
            fontWeight: 'bold',
          }}>
          {props.title}
        </Text>
      </View>
      <View style={{ width: 70 }}>
      </View>
    </Header>
  )
}

