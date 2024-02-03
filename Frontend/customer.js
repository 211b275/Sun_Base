let currentCustomerId = null;
function getCustomers() 
{
    fetch('/api/customers')
        .then(response => response.json())
        .then(data => 
	  {
            const customerList = document.getElementById('customerList');
            customerList.innerHTML = '';
            data.content.forEach(customer => 
		{
                const customerDiv = document.createElement('div');
                customerDiv.innerHTML = `
                    <p>${customer.first_name} ${customer.last_name} - ${customer.email}</p>
                    <button onclick="editCustomer(${customer.id})">Edit</button>
                    <button onclick="deleteCustomer(${customer.id})">Delete</button>
                `;
                customerList.appendChild(customerDiv);
            });
        });
}

function addCustomer() 
{
    const formData = getFormData('addCustomerForm');
    fetch('/api/customers', 
    {
        method: 'POST',
        headers: 
	  {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(() => 
    {
        getCustomers();
        alert('Customer added successfully!');
    })
    .catch(error => console.error('Error:', error));
}

function editCustomer(id) 
{
    fetch(`/api/customers/${id}`)
        .then(response => response.json())
        .then(customer => 
	  {
            currentCustomerId = customer.id;
            document.getElementById('First').value = customer.first_name;
            document.getElementById('Last').value = customer.last_name;
            document.getElementById('street').value = customer.street;
            document.getElementById('pataa').value = customer.address;
            document.getElementById('shahar').value = customer.city;
            document.getElementById('state').value = customer.state;
            document.getElementById('G-mail').value = customer.email;
            window.location.href = `/updateCustomer.html#${id}`;
        })
        .catch(error => console.error('Error:', error));
}

function updateCustomer() 
{
    const formData = getFormData('updateCustomerForm');
    fetch(`/api/customers/${currentCustomerId}`, 
    {
        method: 'PUT',
        headers: 
	  {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(() => 
    {
        getCustomers();
        alert('Customer updated successfully!');
        window.location.href = '/';
    })
    .catch(error => console.error('Error:', error));
}

function deleteCustomer(id) 
{
    if (confirm('Are you sure you want to delete this customer?')) 
    {
        fetch(`/api/customers/${id}`, 
	  {
            method: 'DELETE',
        })
        .then(() => 
	  {
            getCustomers();
            alert('Customer deleted successfully!');
        })
        .catch(error => console.error('Error:', error));
    }
}

function getFormData(formId) 
{
    const formData = {};
    const form = document.getElementById(formId);
    for (const input of form.elements) 
    {
        if (input.tagName === 'INPUT') 
	  {
            formData[input.name] = input.value;
        }
    }
    return formData;
}

getCustomers();
