export const SecondaryComponent = () => {
  return <div>Secondary Component</div>
}

const MixedExportExample = () => {
  return (
    <div>
      <h1>Mixed Export Example</h1>
      <p>This component has both named and default exports</p>
      <SecondaryComponent />
    </div>
  )
}

export default MixedExportExample
