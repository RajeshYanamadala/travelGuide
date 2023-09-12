import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

const apiInitialStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  process: 'PROCESS',
}

class App extends Component {
  state = {
    travelGuidePackageData: [],
    apiStatus: apiInitialStatus.initial,
  }

  componentDidMount() {
    this.renderTravelGuidePackages()
  }

  renderTravelGuidePackages = async () => {
    const urlApi = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    this.setState({apiStatus: 'PROCESS'})
    const response = await fetch(urlApi, options)
    const data = await response.json()
    const travelGuideData = data.packages.map(eachPack => ({
      id: eachPack.id,
      name: eachPack.name,
      description: eachPack.description,
      imageUrl: eachPack.image_url,
    }))
    this.setState({
      travelGuidePackageData: travelGuideData,
      apiStatus: 'SUCCESS',
    })
  }

  renderShowTravelGuideData = () => {
    const {travelGuidePackageData} = this.state
    return travelGuidePackageData.map(eachData => (
      <li className="list-item-container" key={eachData.id}>
        <img
          src={eachData.imageUrl}
          alt={eachData.name}
          className="image-url"
        />
        <h1 className="name">{eachData.name}</h1>
        <p className="description">{eachData.description}</p>
      </li>
    ))
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravelGuidePackagesApp = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiInitialStatus.process:
        return this.renderLoader()
      case apiInitialStatus.success:
        return this.renderShowTravelGuideData()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        <ul className="un-order-list-container">
          {this.renderTravelGuidePackagesApp()}
        </ul>
      </div>
    )
  }
}

export default App
