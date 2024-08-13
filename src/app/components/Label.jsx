export function Label({callback, image}){

    const handleSubmit = (formData) => {
        callback(formData);
    }

    return (
        <form action={handleSubmit}>
            <div dangerouslySetInnerHTML={{__html: image}}>

            </div>
            
            <label htmlFor="prompt">Enter Prompt: </label>
            <input id="prompt" name="prompt" type="text" required />
            <button type="submit">Submit Prompt</button>
        </form>
    )

}