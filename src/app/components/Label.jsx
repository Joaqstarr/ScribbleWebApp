export function Label({callback}){

    const handleSubmit = (formData) => {
        callback(formData);
    }

    return (
        <form action={handleSubmit}>
            <label htmlFor="prompt">Enter Prompt: </label>
            <input id="prompt" name="prompt" type="text" required />
            <button type="submit">Submit Prompt</button>
        </form>
    )

}