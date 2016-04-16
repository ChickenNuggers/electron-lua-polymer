# vim:set noet sts=0 sw=8 ts=8:

check_programs(){
	while true; do
		[[ "$1" ]] || return
		which $1 || exit
		shift
	done
}

on=$'\e[38;005;14m'
off=$'\e[0m'
_start="$on::$off "
_echo(){
	echo "$_start$*"
}

_echo "Checking dependencies..."
check_programs electron bower npm
_echo "All dependencies installed."

_echo "Running download and install portion..."
pushd app
npm install
bower install
popd
_echo "Finished installation."

_echo "Generating startup script..."
echo "$(which electron) $PWD/app" > start.sh
chmod u+x start.sh
_echo "Generated startup script."
exit 0
