import Link from 'next/link'

export const metadata = {
  title: "go back - page not found",
};

export default function NotFound() {
  return (
    <div className='pnf'>
      <h1 className='pnf-title'>404</h1>
      <h2 className='pnf-heading'>Oops ! Page Not Found</h2>
      <Link href="/" className="pnf-btn">
        Go Back
      </Link>
    </div>
  )
}
