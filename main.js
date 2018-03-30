$(document).ready(function () {
  var username;
  var url;
  var values = [];
  var ctx = document.getElementById('mychart').getContext('2d');
  // get input field value on submit click
  function getUsername() {
    if ($('#username').val()) {
      $('#validationOutput').html('');
      username = $('#username').val();
      $('#validationOutput').html(username);
      getUserData(username);

    } else {
      $('#validationOutput').html('Invalid Input');
    }
  }

  function getUserData(username) {
    url = `https://api.github.com/users/${username}`;
    $.ajax({
      url: url,
      success: function (data) {
        displayData(data);
      },
      error: function (e) {
        console.log("Some Error occured couldnt fetch data");

      }
    });
  }

  function displayData(data) {
    console.log(data.name);
    values.push(data.public_repos, data.public_gists, data.followers, data.following);
    console.log(values);
    var chartData = values;
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Public repos", "public gists", "followers", "following"],
        datasets: [{
          label: "Github Info",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [...values]
        }]
      },

      // Configuration options go here
      options: {}

    })

  }

  $('#submitBtn').on('click', getUsername);
})