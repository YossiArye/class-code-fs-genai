import ExpensiveCalcDemo from './ExpensiveCalcDemo'
import StableObjectDemo from './StableObjectDemo'

export default function UseMemoDemo() {
  return (
    <section>
      <h1>useMemo demo</h1>
      <ExpensiveCalcDemo />
      <hr />
      <StableObjectDemo />
    </section>
  )
}
