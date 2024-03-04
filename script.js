let myChart = document.getElementById('myChart').getContext('2d');
let popChart = new Chart(myChart, {
    type: 'bar',
    data: {
        labels: ['Feb 1', 'Feb 2', 'Feb 3', 'Feb 4', 'Feb 5', 'Feb 6', 'Feb 7', 'Feb 8', 'Feb 9', 'Feb 10', 'Feb 11'],
        datasets: [{
            label: 'Sales Details',
            data: [15000, 20000, 13310, 12324, 13338, 18600, 55000, 44000, 56000, 10000, 77000],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(255, 0, 0)',
                'rgb(0, 255, 0)',
                'rgb(0, 0, 255)',
                'rgb(255, 255, 0)',
                'rgb(255, 0, 255)'

            ]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Sales Detail',
            fontSize: 20
        },

        legend: {
            display: true,
            labels: {
                fontColor: '#000'
            }
        },

    },
    tooltips: {
        enabled: true
    }

});

const sideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

sideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		sideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});


const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})

