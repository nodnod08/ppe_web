<template>
	<main role="main">
		<div id="myCarousel" class="carousel slide" data-ride="carousel">
			<ol class="carousel-indicators">
				<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
				<li data-target="#myCarousel" data-slide-to="1"></li>
				<li data-target="#myCarousel" data-slide-to="2"></li>
			</ol>
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img
						style="background-position: center; background-size: cover"
						src="assets/images/printerBG.jpg"
						alt
					/>
					<div class="container">
						<div class="carousel-caption text-left">
							<h1>Printers and Cartridges for Business and Personal use</h1>
							<p>
								Looking for good Printers and Cartridges that will suit on your needs or your
								company? On time assist and support? Branded products? Well, you're here in our
								site. Check our good quality items.
							</p>
						</div>
					</div>
				</div>
				<div class="carousel-item">
					<img src="assets/images/company_profile.jpg" alt />
					<div class="container">
						<div class="carousel-caption">
							<h1>Team Collaboration</h1>
							<p>
								We have a good and qualified team to deliver a satisfying customer assist to our
								beloved clients and consumers. Our responsiblity is to ensure that our customer and
								clients are experiencing a good assist in any of their situation.
							</p>
						</div>
					</div>
				</div>
				<div class="carousel-item">
					<img src="assets/images/maintenance.jpg" alt />
					<div class="container">
						<div class="carousel-caption text-right">
							<h1>Preventive Maintenance</h1>
							<p>
								Keeping the machines in good condition is a good routine in any kind of machine,
								making their functionality like from the beginning. good, fast and solution solver.
								That's why, we always monitor the status of our machines.
							</p>
							<p>
								<a class="btn btn-lg btn-primary" href="/support" role="button">Learn More</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			<a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
		</div>

		<!-- Marketing messaging and featurettes
    ==================================================-->
		<!-- Wrap the rest of the page in another container to center all the content. -->

		<div class="container marketing">
			<!-- Three columns of text below the carousel -->
			<div class="row">
				<div
					v-scroll-reveal="{
						delay: 300,
						duration: 1000,
						scale: 1,
						distance: '100px',
						origin: 'top',
					}"
					class="col-lg-4 intro-modified-left"
				>
					<i style="color: #404040; font-size: 100px;" class="fa fa-certificate"></i>
					<h2>GOOD QUALITY PRODUCTS</h2>
					<p>
						We assure that all of our products are good quality, no deffective, or any issues to
						make our customer or clients always stay on us and continuing support for our business
					</p>
					<p>
						<a class="btn btn-secondary" href="#" role="button">View details &raquo;</a>
					</p>
				</div>
				<!-- /.col-lg-4 -->
				<div
					v-scroll-reveal="{
						delay: 300,
						duration: 1000,
						scale: 1,
						distance: '100px',
						origin: 'bottom',
					}"
					class="col-lg-4 intro-modified-center"
				>
					<i style="color: #404040; font-size: 100px;" class="fa fa-question-circle"></i>
					<h2>CLIENTS SUPPORTING SERVICE</h2>
					<p>
						Giving of fast and full support is one of our key to keeping them omportable to our
						business. giving a solutions and provide their needs is important to us
					</p>
					<p>
						<a class="btn btn-secondary" href="#" role="button">View details &raquo;</a>
					</p>
				</div>
				<!-- /.col-lg-4 -->
				<div
					v-scroll-reveal="{
						delay: 300,
						duration: 1000,
						scale: 1,
						distance: '100px',
						origin: 'top',
					}"
					class="col-lg-4 intro-modified-right"
				>
					<i style="color: #404040; font-size: 100px;" class="fa fa-thumbs-up"></i>
					<h2>Our Company Mission</h2>
					<p>
						Provide customers with high quality products and expertise to express their ideas and
						promote toner cartridge remanufacturing programs that are safer for the public.
					</p>
					<p>
						<a class="btn btn-secondary" href="#" role="button">View details &raquo;</a>
					</p>
				</div>
				<!-- /.col-lg-4 -->
			</div>
			<!-- /.row -->

			<!-- START THE FEATURETTES -->

			<hr class="featurette-divider" />

			<div class="row featurette">
				<div
					v-scroll-reveal="{
						delay: 300,
						duration: 1000,
						scale: 1,
						distance: '100px',
						origin: 'left',
					}"
					class="col-md-7 WCU-text"
				>
					<h2 class="featurette-heading">Why Choose Us?</h2>
					<p class="lead">
						We are Pro Prints Enterprise company that serves a good quality cartridges in two
						different type of printer such as LaserJet and InkJet. Our technicians are well trained
						so that we ensured that in every situation if you need a suuport, you will receive a
						good and effective response. You are the main responsibility of our company, to make
						sure that we gave our best to make your experiences on our items are in great among the
						others.
					</p>
				</div>
				<div
					v-scroll-reveal="{
						delay: 300,
						duration: 1000,
						scale: 1,
						distance: '100px',
						origin: 'right',
					}"
					class="text-center col-md-5 WCU-img"
				>
					<img src="assets/images/feature-1.jpg" alt />
					<h5>HP Color Laserjet MFP M775</h5>
				</div>
			</div>

			<hr class="featurette-divider" />

			<div
				v-scroll-reveal="{
					delay: 300,
					duration: 1000,
					scale: 1,
					distance: '100px',
					origin: 'left',
				}"
				class="row featurette"
			>
				<div class="section2-text col-md-7 order-md-2">
					<h2 class="featurette-heading"></h2>
					<p class="lead">
						The Brother DCP-L2540DW is a reliable, affordable monochrome laser multi-function copier
						with an up to 35-page automatic document feeder for home or small office use. This
						desk-friendly, compact copier has an up to 250-sheet capacity tray, connects with ease
						via wireless networking or Ethernet, and prints and copies at up to 30ppm. Print from
						compatible mobile devices over your wireless network‡;. Scan documents to a variety of
						destinations‡;. Automatic duplex printing helps save paper. 1-year limited warranty plus
						free phone support for life of your product.
					</p>
				</div>
				<div
					v-scroll-reveal="{
						delay: 300,
						duration: 1000,
						scale: 1,
						distance: '100px',
						origin: 'right',
					}"
					class="text-center section2-img col-md-5 order-md-1"
				>
					<img src="assets/images/2540.jpg" alt />
					<h4>Brother DCP-L2540DW</h4>
				</div>
			</div>
			<hr class="featurette-divider" />
			<div
				v-scroll-reveal="{
					delay: 300,
					duration: 1000,
					scale: 1,
					distance: '100px',
					origin: 'left',
				}"
				class="row featurette"
			>
				<div class="section2-text col-md-7 order-md-1">
					<h2 class="featurette-heading">
						We provide a good compatible cartridges.
					</h2>
				</div>
				<div
					v-scroll-reveal="{
						delay: 300,
						duration: 1000,
						scale: 1,
						distance: '100px',
						origin: 'right',
					}"
					class="text-center section2-img col-md-5 order-md-2"
				>
					<img src="assets/images/cartridges.png" alt />
				</div>
			</div>

			<hr class="featurette-divider" />
			<div class="row">
				<div class="text-center col-lg-12 col-md-12">
					<h1>Some of Our Clients</h1>
				</div>
			</div>
			<div
				v-scroll-reveal="{
					delay: 300,
					duration: 1000,
					scale: 1,
					distance: '100px',
					origin: 'bottom',
				}"
				class="row mt-5 top-clients"
			>
				<div class="text-center col-lg-3 col-md-3 col-sm-6">
					<img width="120px" height="150px" src="assets/images/clients_logo/marina.png" alt />
				</div>
				<div class="text-center col-lg-3 col-md-3 col-sm-6">
					<img width="120px" height="140px" src="assets/images/clients_logo/amec.png" alt />
				</div>
				<div class="text-center col-lg-3 col-md-3 col-sm-6">
					<img width="120px" height="140px" src="assets/images/clients_logo/chinabank.png" alt />
				</div>
				<div class="text-center col-lg-3 col-md-3 col-sm-6">
					<img
						style="margin-top: 30px"
						width="120px"
						height="80px"
						src="assets/images/clients_logo/magenic.jpg"
						alt
					/>
				</div>
			</div>
			<div
				v-scroll-reveal="{
					delay: 300,
					duration: 1000,
					scale: 1,
					distance: '100px',
					origin: 'top',
				}"
				class="row mt-5 bottom-clients"
			>
				<div class="text-center col-lg-3 col-md-3 col-sm-6">
					<img width="120px" height="90px" src="assets/images/clients_logo/powercity.png" alt />
				</div>
				<div class="text-center col-lg-3 col-md-3 col-sm-6">
					<img
						style="margin-top: 50px"
						width="120px"
						height="30px"
						src="assets/images/clients_logo/robocash.png"
						alt
					/>
				</div>
				<div class="text-center col-lg-3 col-md-3 col-sm-6">
					<img
						style="margin-top: 50px"
						width="120px"
						height="40px"
						src="assets/images/clients_logo/nyfk.png"
						alt
					/>
				</div>
				<div class="text-center col-lg-3 col-md-3 col-sm-6">
					<img
						style="margin-top: 30px"
						width="170px"
						height="85px"
						src="assets/images/clients_logo/nikkoshi.png"
						alt
					/>
				</div>
			</div>
			<br />
			<br />
			<br />
			<!-- /END THE FEATURETTES -->
		</div>
		<!-- /.container -->
	</main>
</template>

<script>
export default {
	mounted() {
		this.loader();
	},
	methods: {
		loader: function() {
			this.$store.dispatch('loader');
		},
	},
};
</script>

<style></style>
