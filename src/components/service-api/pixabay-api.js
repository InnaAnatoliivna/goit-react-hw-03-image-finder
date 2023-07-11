export const fetchImages = async (name) => {
    const key = '36885603-fb02061b93c5e3b035d34c370';
    const response = await fetch(`https://pixabay.com/api/?q=${name}&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
    if (response.ok) {
        return response.json();
    }
    return await Promise.reject(`No image found with the name ${name}`);
}