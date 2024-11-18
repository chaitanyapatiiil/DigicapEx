<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

export default function nav(){
    return(
        <div>
            <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" alt="logo"/>
            <h2>DeltaxChange</h2>

            <h4>Menu</h4>
            <ul>
                <li><i class="fa-solid fa-grid-2"></i>Dashboard</li>
                <li>Trnsaction</li>
                <li>Reconcilations</li>
                <li>Tax Reports</li>
                <li>Live Rates</li>
            </ul>

            <h4>Connected accounts</h4>
            <ul>
                <li>Binance</li>
                <li>coinbase</li>
            </ul>

            <button>+ Add Account</button>
        </div>
    )
}