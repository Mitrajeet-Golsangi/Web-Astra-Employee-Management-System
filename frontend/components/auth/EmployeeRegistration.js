import React from 'react';
// import CustomInputs from '../partials/Form Components/CustomInput'
const EmployeeRegistration = () => {
	return <div>
		<>
			<div>
				<form action="" method="post" >


					Employee Details

					<div>
						<label for="email">First Name</label>
						<input type="email" name="email" id="email" required></input>
					</div>
					<div>
						<label for="email">Last Name</label>
						<input type="email" name="email" id="email" required></input>
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
	</div>;
};

export default EmployeeRegistration;
