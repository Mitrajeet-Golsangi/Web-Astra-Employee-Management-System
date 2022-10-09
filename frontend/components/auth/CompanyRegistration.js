import React from 'react'

const CompanyRegistration = () => {
	return (
		<>
			<div>
				<form action="" method="post" >

					<div>

						<label for="name">Company Name </label>
						<input type="text" name="name" id="name" required></input>
					</div>

					<div>
						<label for="email">Company Email</label>
						<input type="email" name="email" id="email" required></input>
					</div>

					<div>
						<label for="type">Company Type</label>
						<input type="email" name="email" id="type" required></input>
					</div>

					<div>
						<label for="comp_address">Company address</label>
						<input type="email" name="email" id="comp_address" required></input>
					</div>

					Admin Details

					<div>
						<label for="fname">First Name</label>
						<input type="email" name="email" id="fname" required></input>
					</div>
					<div>
						<label for="lname">Last Name</label>
						<input type="email" name="email" id="lanme" required></input>
					</div>
					<div>
						<label for="email">Email</label>
						<input type="email" name="email" id="email" required></input>
					</div>
					<div>
						<label for="email">Password</label>
						<input type="email" name="email" id="email" required></input>
					</div>
					<div>
						<label for="email">Contact no</label>
						<input type="email" name="email" id="email" required></input>
					</div>
					<div>
						<label for="email">Company address</label>
						<input type="email" name="email" id="email" required></input>
					</div>

					<div>

					<input type="submit" value="Register!"></input>
					</div>

				</form>
			</div>
		</>
	);
}

export default CompanyRegistration