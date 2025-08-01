// Find line 94 and replace the problematic angle bracket with an escaped version
// Change this:
// something like: <SomeComponent>
// To this:
// something like: {'<SomeComponent>'}

// If you're showing code examples, make sure all angle brackets are escaped like this:
// For example, if you have:
// const example = <Component>;
// Change to:
// const example = {'<Component>'};

// Alternatively, you can use HTML entities:
// const example = &lt;Component&gt;;

// Without seeing the exact line, here's a general fix for line 94:
// Replace any direct angle brackets with escaped versions:
// Before: <SomeTag>
// After: {'<SomeTag>'}

const SDKDocumentation = () => {
  return (
    <div>
      {/* Your SDK documentation content here */}
      <p>Example: {"<SomeComponent>"}</p>
    </div>
  )
}

export default SDKDocumentation
