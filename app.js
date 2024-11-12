document.getElementById('poll-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const options = document.getElementsByName('poll');
    let selectedOption;
    for (const option of options) {
        if (option.checked) {
            selectedOption = option.value;
            break;
        }
    }

    if (selectedOption) {
        await fetch('http://localhost:3000/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ option: selectedOption })
        });

        const response = await fetch('http://localhost:3000/results');
        const votes = await response.json();

        document.getElementById('poll-form').style.display = 'none';
        document.getElementById('result').style.display = 'block';

        const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);
        const resultMessage = votes.map(vote => {
            const percentage = ((vote.count / totalVotes) * 100).toFixed(2);
            return `${vote.option.replace('image', 'Image ')}: ${percentage}% (${vote.count} votes)`;
        }).join('<br>');

        document.getElementById('result-message').innerHTML = resultMessage;
    }
});
