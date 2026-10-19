import Counter from '../components/Counter'
import PersonForm from '../components/PersonForm'
import UseEffectAfterRender from '../components/UseEffectAfterRender'
import RunEffectOnlyOnce from '../components/RunEffectOnlyOnce'
import UseEffectCleanupParent from '../components/UseEffectCleanupParent'
// import FetchingData from '../components/FetchingData'
import PostingData from '../components/PostingData'

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      {/* <Counter />
      <PersonForm />
      <h2>useEffect</h2>
      <UseEffectAfterRender />
      <RunEffectOnlyOnce />
      <UseEffectCleanupParent />
      <FetchingData /> */}
      <PostingData />
    </>
  )
}
