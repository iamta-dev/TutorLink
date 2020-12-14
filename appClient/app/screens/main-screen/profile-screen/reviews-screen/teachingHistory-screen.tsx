import React from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, ScrollView, StyleSheet, Platform, StatusBar } from "react-native"
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


export interface TeachingHistoryScreenProps {
  navigation: NavigationScreenProp<{}>
}


export const TeachingHistoryScreen: React.FunctionComponent<TeachingHistoryScreenProps> = observer((props) => {

  const { navigation } = props
  const goBack = React.useMemo(() => () => navigation.goBack(null), [props.navigation])
  const goReviewsSubject = () => { props.navigation.navigate("reviewsSubject") }
  
  return (
    <>
      {/* light-content ,dark-content*/}
      <Container style={{ backgroundColor: '#fcfcfc' }}>
        <StatusBar backgroundColor="#29B6F6" barStyle="light-content" />
        <HeadBer theme="#29B6F6" title='ประวัติการสอน' goBackPage={goBack} />

        <ScrollView>

          <List>
            <View>
              <Text style={{ marginHorizontal: 20, marginVertical: 10 }}>ล่าสุด</Text>
              <View style={{ paddingHorizontal: 0 }}>
                <SubjectItem subjectName="เคมี 2" date="19/08/61" goReviewsSubject={goReviewsSubject}/>
              </View>
            </View>
            <View>
              <Text style={{ marginHorizontal: 20, marginVertical: 10 }}>ก่อนหน้า</Text>
              <View style={{ paddingHorizontal: 0 }}>
                <SubjectItem subjectName="เเคลคูลัส 2" date="01/02/63" goReviewsSubject={goReviewsSubject}/>
                <SubjectItem subjectName="ฟิสิกส์ 1" date="21/08/62" goReviewsSubject={goReviewsSubject}/>
                <SubjectItem subjectName="ฟิสิกส์ 2" date="02/12/63" goReviewsSubject={goReviewsSubject}/>
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
    flex: 1,
    borderRadius: 15,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#C6C6C6',
    shadowOffset: { height: 5, width: 0 },
    backgroundColor: '#FFFFFF',
    flexDirection: 'column'
  }
})


export interface SubjectItemProps {
  subjectName?: string,
  date?: string,
  goReviewsSubject?: () => void

}


const SubjectItem: React.FunctionComponent<SubjectItemProps> = props => {
  return (
    <>
      <View style={styles.cardRounded}>
        <TouchableOpacity onPress={props.goReviewsSubject} >
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
            <View></View>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <View></View>
            <View style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Icon type="Ionicons" name="ios-star" style={{ color: '#FFCD34', marginHorizontal: 5 }}></Icon>
                <Icon type="Ionicons" name="ios-star" style={{ color: '#FFCD34', marginHorizontal: 5 }}></Icon>
                <Icon type="Ionicons" name="ios-star-half" style={{ color: '#FFCD34', marginHorizontal: 5 }}></Icon>
                <Icon type="Ionicons" name="ios-star-outline" style={{ color: '#FFCD34', marginHorizontal: 5 }}></Icon>

              </View>
              <View style={{
                flexDirection: 'row',
                alignSelf: 'center'
              }}>
                <Text style={{color: '#6F6F6F'}}>
                  คะเเนนจากนักเรียน
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
            <View></View>
            <View>
              <Text note>
                {props.date}
              </Text>
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
